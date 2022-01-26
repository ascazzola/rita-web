package edu.robocode.service.models


import robocode.control.BattlefieldSpecification
import robocode.control.events.BattleEvent
import robocode.control.snapshot.BulletState
import robocode.control.snapshot.RobotState
import java.util.*

data class BattleSpecification(val numberOfRounds: Int, val inactivityTime: Long, val gunCoolingRate: Double,
                               val predefinedRobots: List<String>, val userRobots: List<UUID>?,
                               val battlefieldSpecification: BattlefieldSpecification)

data class Battle(val id: UUID, val name: String, val started: Boolean, val specification: BattleSpecification, val lastEvent: IBattleEvent? = null)
data class NewBattle(val name: String, val specification: BattleSpecification)

enum class BattleEventType {
    BattleStarted,
    RoundStarted,
    TurnEnded,
    RoundEnded,
    BattleCompleted
}

interface IBattleEvent {
    val type: BattleEventType
}

data class Robot(val name: String, val shortName: String, val veryShortName: String, val teamName: String, val robotIndex: Int, val teamIndex: Int, val state: RobotState,
                 val energy: Double, val velocity: Double, val gunHeat: Double, val bodyHeading: Double, val gunHeading: Double, val radarHeading: Double, val x: Double, val y: Double,
                 val bodyColor: Int, val gunColor: Int, val radarColor: Int, val scanColor: Int, val isDriod: Boolean, val isSentryRobot: Boolean, val isPaintRobot: Boolean, val isPaintEnabled: Boolean,
                 val isSGPaintEnabled: Boolean)

data class Bullet(val state: BulletState, val power: Double, val x: Double, val y: Double, val paintX: Double, val paintY: Double, val color: Int, val frame: Int, val isExplosion: Boolean,
                  val explosionImageIndex: Int, val bulletId: Int, val victimIndex: Int, val ownerIndex: Int, val heading: Double)

data class ScoreSnapshot(val name: String, val totalScore: Double, val totalSurvivalScore: Double, val totalLastSurvivorBonus: Double, val bulletDamageScore: Double, val bulletKillBonus: Double,
                         val totalRammingDamageScore: Double, val totalFirsts: Int, val totalSeconds: Int, val totalThirds: Int, val currentScore: Double, val currentSurvivalScore: Double,
                         val currentSurvivalBonus: Double, val currentBulletDamageScore: Double, val currentBulletKillBonus: Double, val currentRammingDamageScore: Double,
                         val currentRammingKillBonus: Double)

data class TurnSnapshot(val robots: Array<Robot>, val bullets: Array<Bullet>, val round: Int, val turn: Int, val sortedTeamScore: Array<ScoreSnapshot>, val indexedTeamScores: Array<ScoreSnapshot>)

data class BattleStartedEvent(val numberOfRounds: Int, val gunCoolingRate: Double, val inactivityTime: Long, val robotsCount: Int, val isReplay: Boolean): BattleEvent(), IBattleEvent {
    override val type: BattleEventType = BattleEventType.BattleStarted

}

data class BattleResult(val teamLeaderName: String, val rank: Int, val score: Int, val survival: Int, val lastSurvivorBonus: Int, val bulletDamage: Int, val bulletDamageBonus: Int, val ramDamage: Int, val ramDamageBonus: Int, val firsts: Int, val seconds: Int, val thirds: Int);

data class BattleCompletedEvent(val result: Array<BattleResult>): BattleEvent(), IBattleEvent {
    override val type: BattleEventType = BattleEventType.BattleCompleted
}

data class RoundStartedEvent(val round: Int, val startSnapshot: TurnSnapshot): IBattleEvent {
    override val type: BattleEventType = BattleEventType.RoundStarted
}

data class RoundEndedEvent(val round: Int, val turns: Int, val totalTurns: Int): BattleEvent(), IBattleEvent{
    override val type: BattleEventType = BattleEventType.RoundEnded
}

data class TurnEndedEvent(val round: Int, val turnSnapshot: TurnSnapshot): BattleEvent(), IBattleEvent {
    override val type: BattleEventType = BattleEventType.TurnEnded
}