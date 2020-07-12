package edu.robocode.service.application

import com.google.gson.*
import reactor.core.publisher.Flux.merge
import reactor.core.publisher.ReplayProcessor
import robocode.control.events.BattleAdaptor
import robocode.control.events.BattleCompletedEvent
import robocode.control.events.RoundStartedEvent
import robocode.control.events.TurnEndedEvent
import java.time.Duration
import java.util.*


class BattleListener(private val manager: IRobocodeInstanceManager, private val id: UUID): BattleAdaptor() {
    private val roundStartedProcessor = ReplayProcessor.create<String>(1)
    private val turnEndedProcessor = ReplayProcessor.create<String>(1)
    private val battleCompletedProcessor = ReplayProcessor.create<String>(1)
    val battleEventProcessor = merge(roundStartedProcessor, turnEndedProcessor, battleCompletedProcessor)
            .delayElements(Duration.ofMillis(500))
            .doAfterTerminate {  this.manager.dispose(this.id); }
    private var gson = GsonBuilder().registerTypeHierarchyAdapter(Object::class.java, BattleEventSerializer()).create();

    override fun onRoundStarted(event: RoundStartedEvent) {
        roundStartedProcessor.onNext(gson.toJson(event))
    }

    override fun onTurnEnded(event: TurnEndedEvent) {
        turnEndedProcessor.onNext(gson.toJson(event))

    }

    override fun onBattleCompleted(event: BattleCompletedEvent) {
        battleCompletedProcessor.onNext(gson.toJson(event))
        roundStartedProcessor.onComplete()
        turnEndedProcessor.onComplete()
        battleCompletedProcessor.onComplete()
    }
}

