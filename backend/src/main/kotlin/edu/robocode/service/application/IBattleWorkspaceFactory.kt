package edu.robocode.service.application

import java.util.*

interface IBattleWorkspaceFactory {
    fun create(preDefinedRobots: List<String>, robotsIds: List<UUID>) : BattleWorkspace
}

data class BattleWorkspace(
    val homePath: String,
    val robotNames: List<String>
)