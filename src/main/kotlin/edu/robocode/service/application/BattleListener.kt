package edu.robocode.service.application

import com.google.gson.Gson
import reactor.core.publisher.ReplayProcessor
import robocode.control.events.*
import java.util.*

class BattleListener(private val manager: IRobocodeInstanceManager, private val id: UUID): BattleAdaptor() {
    val battleEventProcessor = ReplayProcessor.create<String>()

    override fun onBattleStarted(event: BattleStartedEvent) {
        this.battleEventProcessor.onNext(Gson().toJson(event))
    }

    override fun onRoundStarted(event: RoundStartedEvent) {
        this.battleEventProcessor.onNext(Gson().toJson(event))
    }

    override fun onTurnEnded(event: TurnEndedEvent) {
        this.battleEventProcessor.onNext(Gson().toJson(event))

    }

    override fun onBattleCompleted(event: BattleCompletedEvent) {
        this.battleEventProcessor.onNext(Gson().toJson(event))
        battleEventProcessor.onComplete();
        this.manager.dispose(this.id);
    }
}