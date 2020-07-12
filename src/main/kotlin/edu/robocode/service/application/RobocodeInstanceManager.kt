package edu.robocode.service.application

import edu.robocode.service.RobocodeConfiguration
import edu.robocode.service.models.Battle
import edu.robocode.service.models.BattleSpecification as BattleSpecificationModel
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.ReplayProcessor
import robocode.control.BattleSpecification
import robocode.control.BattlefieldSpecification
import robocode.control.RobocodeEngine
import java.io.File
import java.util.*
import kotlin.collections.HashMap


@Service
class RobocodeInstanceManager(val configuration: RobocodeConfiguration) : IRobocodeInstanceManager {
    val battlesProcessor = ReplayProcessor.create<List<Battle>>(1)
    val battles = HashMap<UUID, BattleState>();

    override fun newBattle(name: String, numberOfRounds: Int, inactivityTime: Long, gunCoolingRate: Double, robots: List<String>, battlefieldSpecification: BattlefieldSpecification): UUID {
        val id = UUID.randomUUID()
        val engine = RobocodeEngine(File(configuration.homePath))

        val listener = BattleListener(this, id)
        engine.addBattleListener(listener)

        battles[id] = BattleState(engine, listener, name, getBattleSpecification(engine, numberOfRounds, inactivityTime, gunCoolingRate, robots, battlefieldSpecification))
        battlesProcessor.onNext(mapBattles())
        return id;
    }

    override fun startBattle(id: UUID) {
        val battleState = this.getBattleState(id)
        battleState.start()
    }

    override fun getBattlesEvents(): Flux<List<Battle>> {
       return this.battlesProcessor
    }

    override fun getBattleEvents(id: UUID): Flux<String> {
        val battleState = this.getBattleState(id)
        return battleState.listener.battleEventProcessor
    }

    override fun dispose(id: UUID) {
        battles.remove(id);
        battlesProcessor.onNext(mapBattles())
    }

    private fun getBattleSpecification(engine: RobocodeEngine, numberOfRounds: Int, inactivityTime: Long, gunCoolingRate: Double, robots: List<String>, battlefieldSpecification: BattlefieldSpecification): BattleSpecification {
        val robotsSpecifications = engine.getLocalRepository(robots.joinToString())
        return BattleSpecification(numberOfRounds, inactivityTime, gunCoolingRate, battlefieldSpecification, robotsSpecifications)
    }

    private fun getBattleState(id: UUID): BattleState {
        val battle = battles[id];
        if (battle === null) {
            throw Exception("Battle not found with id = $id")
        }
        return battle
    }

    private fun mapBattles(): List<Battle> {
        return battles.map { (id, state) -> Battle(id, state.name, state.started, BattleSpecificationModel(state.specification.numRounds, state.specification.inactivityTime, state.specification.gunCoolingRate, state.specification.robots.map { robot -> robot.name }, state.specification.battlefield)) }
    }
}

class BattleState(val engine: RobocodeEngine, val listener: BattleListener, val name: String, val specification: BattleSpecification) {
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
}