package edu.robocode.service.application

import edu.robocode.service.RobocodeConfiguration
import org.springframework.stereotype.Service
import robocode.control.BattleSpecification
import robocode.control.BattlefieldSpecification
import robocode.control.RobocodeEngine
import robocode.control.snapshot.ITurnSnapshot
import java.io.File
import java.util.*
import kotlin.collections.HashMap

@Service
class RobocodeInstanceManager : IRobocodeInstanceManager {
    val configuration: RobocodeConfiguration;
    val battles = HashMap<UUID, RobocodeState>();
    
    constructor(configuration: RobocodeConfiguration) {
        this.configuration = configuration;
    }

    override fun newBattle(numberOfRounds: Int, inactivityTime: Long, gunCoolingRate: Double, robots: Array<String>): UUID {
        val id = UUID.randomUUID()
        val engine = RobocodeEngine(File(configuration.homePath))

        val listener = BattleListener(this, id)
        engine.addBattleListener(listener)

        engine.runBattle(getBattleSpecification(engine, numberOfRounds, inactivityTime, gunCoolingRate, robots))

        battles[id] = RobocodeState(engine, listener)
        return id;
    }

    private fun getBattleSpecification(engine: RobocodeEngine, numberOfRounds: Int, inactivityTime: Long, gunCoolingRate: Double, robots: Array<String>): BattleSpecification {
        val battlefieldSpecification = BattlefieldSpecification(800, 600)
        val robotsSpecifications = engine.getLocalRepository(robots.joinToString())
        return BattleSpecification(numberOfRounds, inactivityTime, gunCoolingRate, battlefieldSpecification, robotsSpecifications)
    }

    override fun getSnapshot(id: UUID): ITurnSnapshot {
        val battle = getBattle(id)
        return battle.listener.snapshot
    }

    override fun dispose(id: UUID) {
        //TODO remove engine getBattle(id).engine.close()
        battles.remove(id);
    }

    private fun getBattle(id: UUID): RobocodeState {
        val battle = battles[id];
        if (battle === null) {
            throw Exception("Battle not found with id = $id")
        }
        return battle
    }

}

class RobocodeState {
    val engine: RobocodeEngine
    val listener: BattleListener

    constructor(engine: RobocodeEngine, listener: BattleListener) {
        this.engine = engine;
        this.listener = listener;
    }
}