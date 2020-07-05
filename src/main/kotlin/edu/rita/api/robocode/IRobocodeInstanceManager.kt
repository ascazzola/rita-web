package edu.rita.api.robocode

import robocode.control.snapshot.ITurnSnapshot
import java.util.*

interface IRobocodeInstanceManager {
    fun newBattle(numberOfRounds: Int, inactivityTime: Long, gunCoolingRate: Double, robots: Array<String>): UUID
    fun getSnapshot(id: UUID): ITurnSnapshot
    fun dispose(id: UUID)
}
