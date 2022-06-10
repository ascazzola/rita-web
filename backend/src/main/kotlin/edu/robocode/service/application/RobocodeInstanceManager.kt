package edu.robocode.service.application

import edu.robocode.service.config.WebSocketConfig
import edu.robocode.service.controllers.BattlesController
import edu.robocode.service.models.Battle
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono
import reactor.core.publisher.ReplayProcessor
import robocode.control.BattleSpecification
import robocode.control.BattlefieldSpecification
import robocode.control.RobocodeEngine
import robocode.control.RobotSetup
import java.io.File
import java.util.*
import edu.robocode.service.models.BattleSpecification as BattleSpecificationModel


@Service
class RobocodeInstanceManager(
    val websocket: SimpMessagingTemplate,
    val workspaceFactory: IBattleWorkspaceFactory
    ) : IRobocodeInstanceManager {
    val logger: Logger = LoggerFactory.getLogger(BattlesController::class.java)
    val battlesProcessor = ReplayProcessor.cacheLastOrDefault<List<Battle>>(emptyList())
    val battles = HashMap<UUID, BattleState>()

    init {
        this.battlesProcessor.subscribe{battles ->
            this.logger.info("battle created / started / deleted");
            this.websocket.convertAndSend("${WebSocketConfig.MESSAGE_PREFIX}/battles", battles)}
    }

    override fun newBattle(params: BattleParameters): UUID {
        val id = UUID.randomUUID()
        val (preDefinedRobots, robotsIds) = params.robots
        val workspace = workspaceFactory.create(preDefinedRobots, robotsIds)
        val engine = RobocodeEngine(File(workspace.homePath))

        val listener = BattleListener(this, id, this.websocket)
        engine.addBattleListener(listener)

        val name = params.name
        val numberOfRounds = params.numberOfRounds
        val inactivityTime = params.inactivityTime
        val gunCoolingRate = params.gunCoolingRate
        val robots = workspace.robots
        val battlefieldSpecification = params.battlefieldSpecification
        val robocodeBattleSpecification = getBattleSpecification(engine, numberOfRounds, inactivityTime, gunCoolingRate,
            robots, battlefieldSpecification)
        battles[id] = BattleState(engine, listener, name, robocodeBattleSpecification)
        battlesProcessor.onNext(mapBattles())
        return id
    }

    override fun startBattle(id: UUID) {
        val battleState = this.getBattleState(id)
        battleState.start()
        battlesProcessor.onNext(mapBattles())
    }

    override fun disposeBattle(id: UUID) {
        battles.remove(id)
        battlesProcessor.onNext(mapBattles())
    }

    override fun getBattle(id: UUID): Mono<Battle> {
        val state = getBattleState(id)

        if (!state.started) {
            return Mono.just(Battle(id, state.name, state.started, state.getBattleSpecificationModel()));
        }

        return state.listener.getLastEvent().map { event -> Battle(id, state.name, state.started, state.getBattleSpecificationModel(), event) }
    }

    override fun getBattles(): Mono<List<Battle>> {
        return battlesProcessor.take(1).last()
    }

    private fun getBattleSpecification(engine: RobocodeEngine, numberOfRounds: Int,
                                       inactivityTime: Long, gunCoolingRate: Double,
                                       robots: Map<String, Triple<Double?, Double?, Double>?>,
                                       battlefieldSpecification: BattlefieldSpecification): BattleSpecification {
        val robotsSpecifications = engine.getLocalRepository(robots.keys.joinToString())
        val initialSetups = robots.values.map { x -> RobotSetup(x?.first, x?.second, x?.third)}.toTypedArray()
        return BattleSpecification(battlefieldSpecification, numberOfRounds, inactivityTime, gunCoolingRate, 100,
            false, robotsSpecifications, initialSetups)
    }

    private fun getBattleState(id: UUID): BattleState {
        val battle = battles[id]
        if (battle === null) {
            throw Exception("Battle not found with id = $id")
        }
        return battle
    }

    private fun mapBattles(): List<Battle> {
        return battles.map { (id, state) -> Battle(id, state.name, state.started, state.getBattleSpecificationModel()) }
    }
}

class BattleState(private val engine: RobocodeEngine, val listener: BattleListener, val name: String, private val specification: BattleSpecification) {
    var started = false

    fun start () {
        synchronized(this) {
            if (this.started) {
                throw Exception("Battle already started")
            }
            this.engine.runBattle(this.specification, true)
            started = true
        }
    }

    fun getBattleSpecificationModel(): BattleSpecificationModel {
        // ToDo review it
        return  BattleSpecificationModel(specification.numRounds, specification.inactivityTime, specification.gunCoolingRate, mapOf(), mapOf(), specification.battlefield)
    }
}