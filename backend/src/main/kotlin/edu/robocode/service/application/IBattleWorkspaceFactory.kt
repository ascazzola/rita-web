package edu.robocode.service.application

import java.util.*

interface IBattleWorkspaceFactory {
    fun create(preDefinedRobots: Map<String, Triple<Double, Double, Double>?>?, robotsIds: Map<UUID, Triple<Double, Double, Double>?>?) : BattleWorkspace
}

data class BattleWorkspace(
    val homePath: String,
    val robots: Map<String, Triple<Double, Double, Double>?>
)