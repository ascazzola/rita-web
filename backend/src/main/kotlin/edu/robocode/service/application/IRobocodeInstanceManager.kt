package edu.robocode.service.application

import edu.robocode.service.models.Battle
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import robocode.control.BattlefieldSpecification
import robocode.control.events.BattleEvent
import robocode.control.events.TurnEndedEvent
import robocode.control.snapshot.ITurnSnapshot
import java.util.*

interface IRobocodeInstanceManager {
    fun newBattle(name: String, numberOfRounds: Int, inactivityTime: Long, gunCoolingRate: Double, robots: List<String>, battlefieldSpecification: BattlefieldSpecification): UUID
    fun startBattle(id: UUID)
    fun disposeBattle(id: UUID)
    fun getBattle(id: UUID): Mono<Battle>
    fun getBattles(): Mono<List<Battle>>
}
