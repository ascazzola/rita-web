package edu.robocode.service.controllers

import edu.robocode.service.application.IRobocodeInstanceManager
import org.springframework.context.annotation.Scope
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import org.springframework.web.context.WebApplicationContext
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import robocode.control.events.BattleEvent
import robocode.control.snapshot.ITurnSnapshot
import java.util.*

@RestController
@Scope(value = WebApplicationContext.SCOPE_REQUEST)
@RequestMapping("api/battles")
class BattleController(private val instanceManager: IRobocodeInstanceManager) {

    @PostMapping("")
    fun create() : Mono<UUID> {
        val id = instanceManager.newBattle(10,450, 0.1, arrayOf("sample.Corners", "sample.Walls"))
        return Mono.just(id);
    }

    @PostMapping("/{id}/start")
    @ResponseStatus(HttpStatus.OK)
    fun start(@PathVariable id: UUID) {
        instanceManager.startBattle(id)
    }

    @RequestMapping("")
    fun getBattlesEvents() : Flux<Array<UUID>> {
        return instanceManager.getBattlesEvents();
    }

    @RequestMapping("/{id}")
    fun getBattleEvents(@PathVariable id: UUID) : Flux<BattleEvent> {
       return instanceManager.getBattleEvents(id);
    }
}