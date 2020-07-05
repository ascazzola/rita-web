package edu.rita.api.robocode

import net.sf.robocode.battle.snapshot.TurnSnapshot
import robocode.control.events.*
import robocode.control.snapshot.ITurnSnapshot
import java.util.*

class BattleListener: BattleAdaptor {
    private val manager: IRobocodeInstanceManager;
    private val id: UUID;
    var snapshot: ITurnSnapshot = TurnSnapshot()
    private  set

    constructor(manager: IRobocodeInstanceManager, id: UUID): super() {
        this.manager = manager;
        this.id = id;
    }

    override fun onRoundStarted(event: RoundStartedEvent) {
        this.snapshot = event.startSnapshot
        // Inform via webSocked
    }

    override fun onTurnEnded(event: TurnEndedEvent) {
        this.snapshot = event.turnSnapshot
        // Inform via webSocked
    }

    override fun onBattleCompleted(event: BattleCompletedEvent) {
        this.manager.dispose(this.id);
    }
}