package edu.robocode.service.application

import edu.robocode.service.models.Battle
import reactor.core.publisher.Flux
import robocode.control.BattlefieldSpecification
import robocode.control.events.BattleEvent
import robocode.control.events.TurnEndedEvent
import robocode.control.snapshot.ITurnSnapshot
import java.util.*

interface IRobocodeInstanceManager {
    fun newBattle(name: String, numberOfRounds: Int, inactivityTime: Long, gunCoolingRate: Double, robots: List<String>, battlefieldSpecification: BattlefieldSpecification): UUID
    fun startBattle(id: UUID)
    fun getBattlesEvents(): Flux<List<Battle>>
    fun getBattleEvents(id: UUID): Flux<String>
    fun dispose(id: UUID)
}
