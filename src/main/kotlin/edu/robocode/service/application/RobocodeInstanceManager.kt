package edu.robocode.service.application

import edu.robocode.service.RobocodeConfiguration
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.ReplayProcessor
import robocode.control.BattleSpecification
import robocode.control.BattlefieldSpecification
import robocode.control.RobocodeEngine
import robocode.control.events.BattleEvent
import java.io.File
import java.util.*
import kotlin.collections.HashMap

@Service
class RobocodeInstanceManager(val configuration: RobocodeConfiguration) : IRobocodeInstanceManager {
    val battlesProcessor = ReplayProcessor.create<Array<UUID>>(1)
    val battles = HashMap<UUID, BattleState>();

    override fun newBattle(numberOfRounds: Int, inactivityTime: Long, gunCoolingRate: Double, robots: Array<String>): UUID {
        val id = UUID.randomUUID()
        val engine = RobocodeEngine(File(configuration.homePath))

        val listener = BattleListener(this, id)
        engine.addBattleListener(listener)

        battles[id] = BattleState(engine, listener, getBattleSpecification(engine, numberOfRounds, inactivityTime, gunCoolingRate, robots))
        battlesProcessor.onNext(battles.keys.toTypedArray())
        return id;
    }

    override fun startBattle(id: UUID) {
        val battleState = this.getBattleState(id)
        battleState.start()
    }

    override fun getBattlesEvents(): Flux<Array<UUID>> {
       return this.battlesProcessor
    }

    override fun getBattleEvents(id: UUID): Flux<BattleEvent> {
        val battleState = this.getBattleState(id)
        return battleState.listener.battleEventProcessor
    }

    override fun dispose(id: UUID) {
        //TODO remove engine getBattle(id).engine.close()
        /*battles.remove(id);
        battlesProcessor.onNext(battles.keys.toTypedArray())*/
    }

    private fun getBattleSpecification(engine: RobocodeEngine, numberOfRounds: Int, inactivityTime: Long, gunCoolingRate: Double, robots: Array<String>): BattleSpecification {
        val battlefieldSpecification = BattlefieldSpecification(800, 600)
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

}

class BattleState(val engine: RobocodeEngine, val listener: BattleListener, val specification: BattleSpecification) {
    var started = false

    fun start () {
        synchronized(this) {
            if (this.started) {
                throw Exception("Battle already started")
            }
            this.engine.runBattle(this.specification)
            started = true
        }
    }
}