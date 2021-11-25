package edu.robocode.service.application

import edu.robocode.service.models.Battle
import reactor.core.publisher.Mono
import robocode.control.BattlefieldSpecification
import java.util.*

interface IRobocodeInstanceManager {
    fun newBattle(params: BattleParameters): UUID
    fun startBattle(id: UUID)
    fun disposeBattle(id: UUID)
    fun getBattle(id: UUID): Mono<Battle>
    fun getBattles(): Mono<List<Battle>>
}


data class BattleParameters(
    val name: String,
    val numberOfRounds: Int,
    val inactivityTime: Long,
    val gunCoolingRate: Double,
    val robots: RobotsParameters,
    val battlefieldSpecification: BattlefieldSpecification
)

data class RobotsParameters (
    val preDefinedRobots: List<String>,
    val robotsIds : List<UUID>,
)

