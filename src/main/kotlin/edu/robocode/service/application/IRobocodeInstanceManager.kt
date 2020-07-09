package edu.robocode.service.application

import reactor.core.publisher.Flux
import robocode.control.events.BattleEvent
import robocode.control.events.TurnEndedEvent
import robocode.control.snapshot.ITurnSnapshot
import java.util.*

interface IRobocodeInstanceManager {
    fun newBattle(numberOfRounds: Int, inactivityTime: Long, gunCoolingRate: Double, robots: Array<String>): UUID
    fun startBattle(id: UUID)
    fun getBattlesEvents(): Flux<Array<UUID>>
    fun getBattleEvents(id: UUID): Flux<String>
    fun dispose(id: UUID)
}
