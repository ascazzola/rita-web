package edu.robocode.service.application

import edu.robocode.service.config.WebSocketConfig
import edu.robocode.service.models.IBattleEvent
import org.springframework.messaging.simp.SimpMessagingTemplate
import reactor.core.publisher.Mono
import reactor.core.publisher.ReplayProcessor
import reactor.core.publisher.UnicastProcessor
import robocode.BattleResults
import robocode.control.events.*
import robocode.control.snapshot.IBulletSnapshot
import robocode.control.snapshot.IRobotSnapshot
import robocode.control.snapshot.IScoreSnapshot
import robocode.control.snapshot.ITurnSnapshot
import java.time.Duration
import java.util.*
import edu.robocode.service.models.BattleStartedEvent as BattleStartedEventModel
import edu.robocode.service.models.RoundStartedEvent as RoundStartedEventModel
import edu.robocode.service.models.TurnSnapshot as TurnSnapshotModel
import edu.robocode.service.models.Robot as RobotModel
import edu.robocode.service.models.Bullet as BulletModel
import edu.robocode.service.models.ScoreSnapshot as ScoreSnapshotModel
import edu.robocode.service.models.TurnEndedEvent as TurnEndedEventModel
import edu.robocode.service.models.RoundEndedEvent as RoundEndedEventModel
import edu.robocode.service.models.BattleCompletedEvent as BattleCompletedEventModel
import edu.robocode.service.models.BattleResult as BattleResultModel

class BattleListener(private val manager: IRobocodeInstanceManager, private val id: UUID, private val websocket: SimpMessagingTemplate): BattleAdaptor(), IBattleState {
    private val robocodeBattleEventProcessor = UnicastProcessor.create<IBattleEvent>() // Required: robocode run the battles as fast as possible we are using 2 processor to delay events
    private val customBattleEventProcessor = ReplayProcessor.cacheLast<IBattleEvent>()

    init {
        this.robocodeBattleEventProcessor
                .delayElements(Duration.ofMillis(100))
                .doAfterTerminate {  this.manager.disposeBattle(this.id); }
                .subscribe { e ->
                    customBattleEventProcessor.onNext(e)
                    websocket.convertAndSend("${WebSocketConfig.MESSAGE_PREFIX}/battles/${id}", e)
                }
    }

    override fun onBattleStarted(event: BattleStartedEvent) {
        val model = BattleStartedEventModel(event.battleRules.numRounds, event.battleRules.gunCoolingRate, event.battleRules.inactivityTime, event.robotsCount, event.isReplay)
        robocodeBattleEventProcessor.onNext(model);
    }

    override fun onRoundStarted(event: RoundStartedEvent) {
        val model = RoundStartedEventModel(event.round + 1, mapTurnSnapshot(event.startSnapshot))
        robocodeBattleEventProcessor.onNext(model)
    }

    override fun onTurnEnded(event: TurnEndedEvent) {
        robocodeBattleEventProcessor.onNext(TurnEndedEventModel(event.turnSnapshot.round + 1, mapTurnSnapshot(event.turnSnapshot)))
    }

    override fun onRoundEnded(event: RoundEndedEvent) {
        robocodeBattleEventProcessor.onNext(RoundEndedEventModel(event.round + 1, event.turns, event.totalTurns))
    }

    override fun onBattleCompleted(event: BattleCompletedEvent) {
        robocodeBattleEventProcessor.onNext(BattleCompletedEventModel(event.sortedResults.map{ r -> mapBattleResults(r)}.toTypedArray()))
        robocodeBattleEventProcessor.onComplete()
    }

    override fun getLastEvent(): Mono<IBattleEvent> {
        return customBattleEventProcessor.take(1).last()
    }

    private fun mapTurnSnapshot(source: ITurnSnapshot): TurnSnapshotModel {
        return TurnSnapshotModel(
                source.robots.map { r -> mapRobotSnapshot(r) }.toTypedArray(),
                source.bullets.map { b -> mapBulletSnapshot(b) }.toTypedArray(),
                source.round, source.turn,
                source.sortedTeamScores.map { s -> mapScoreSnapshot(s) }.toTypedArray(),
                source.indexedTeamScores.map { s -> mapScoreSnapshot(s) }.toTypedArray()
        )
    }

    private fun mapRobotSnapshot(source: IRobotSnapshot): RobotModel {
        return RobotModel(source.name, source.shortName, source.veryShortName, source.teamName, source.robotIndex,
                source.teamIndex, source.state, source.energy, source.velocity, source.gunHeat, source.bodyHeading,
                source.gunHeading, source.radarHeading, source.x, source.y, source.bodyColor, source.gunColor,
                source.radarColor, source.scanColor, source.isDroid, source.isSentryRobot, source.isPaintRobot,
                source.isPaintEnabled, source.isSGPaintEnabled)
    }

    private fun mapBulletSnapshot(source: IBulletSnapshot): BulletModel {
        return BulletModel(source.state, source.power, source.x, source.y, source.paintX, source.paintY, source.color,
                source.frame, source.isExplosion, source.explosionImageIndex, source.bulletId, source.victimIndex,
                source.ownerIndex, source.heading)
    }

    private fun mapScoreSnapshot(source: IScoreSnapshot): ScoreSnapshotModel {
        return ScoreSnapshotModel(source.name, source.totalScore, source.totalSurvivalScore, source.totalLastSurvivorBonus,
                source.currentBulletDamageScore, source.currentBulletKillBonus, source.totalRammingDamageScore, source.totalFirsts,
                source.totalSeconds, source.totalThirds, source.currentScore, source.currentSurvivalScore, source.currentSurvivalBonus,
                source.currentBulletDamageScore, source.currentBulletKillBonus, source.currentRammingDamageScore, source.currentRammingKillBonus)
    }

    private fun mapBattleResults(source: BattleResults): BattleResultModel {
        return BattleResultModel(source.teamLeaderName, source.rank, source.score, source.survival, source.lastSurvivorBonus,
                source.bulletDamage, source.bulletDamageBonus, source.ramDamage, source.ramDamageBonus, source.firsts, source.seconds,
                source.thirds);
    }
}

interface IBattleState {
    fun getLastEvent(): Mono<IBattleEvent>
}

