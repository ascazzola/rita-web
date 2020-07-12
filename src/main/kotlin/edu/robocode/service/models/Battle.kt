package edu.robocode.service.models


import robocode.control.BattlefieldSpecification
import java.util.*

data class BattleSpecification(val numberOfRounds: Int, val inactivityTime: Long, val gunCoolingRate: Double, val robots: List<String>, val battlefieldSpecification: BattlefieldSpecification)
data class Battle(val id: UUID, val name: String, val started: Boolean, val specification: BattleSpecification)
data class NewBattle(val name: String, val specification: BattleSpecification)