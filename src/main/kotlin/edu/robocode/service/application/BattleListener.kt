package edu.robocode.service.application

import reactor.core.publisher.ReplayProcessor
import robocode.control.events.*
import java.util.*

class BattleListener(private val manager: IRobocodeInstanceManager, private val id: UUID): BattleAdaptor() {
    val battleEventProcessor: ReplayProcessor<BattleEvent> = ReplayProcessor.create(1)

    override fun onBattleStarted(event: BattleStartedEvent) {
        this.battleEventProcessor.onNext(event)
    }

    override fun onRoundStarted(event: RoundStartedEvent) {
        this.battleEventProcessor.onNext(event);
    }

    override fun onTurnEnded(event: TurnEndedEvent) {
        this.battleEventProcessor.onNext(event);
    }

    override fun onBattleCompleted(event: BattleCompletedEvent) {
        this.manager.dispose(this.id);
    }
}