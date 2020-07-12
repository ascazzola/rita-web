package edu.robocode.service.controllers

import edu.robocode.service.application.IRobocodeInstanceManager
import edu.robocode.service.models.Battle
import edu.robocode.service.models.NewBattle
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.context.annotation.Scope
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.context.WebApplicationContext
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.time.Duration
import java.util.*

@RestController
@Scope(value = WebApplicationContext.SCOPE_REQUEST)
@RequestMapping("api/battles")
@CrossOrigin()
class BattleController(private val instanceManager: IRobocodeInstanceManager) {
    val logger: Logger = LoggerFactory.getLogger(BattleController::class.java)

    @PostMapping("")
    fun create(@RequestBody battle: NewBattle) : Mono<UUID> {
        val specification = battle.specification
        val id = instanceManager.newBattle(battle.name, specification.numberOfRounds, specification.inactivityTime, specification.gunCoolingRate, specification.robots, specification.battlefieldSpecification)
        // val id = instanceManager.newBattle(10,450, 0.1, arrayOf("sample.Corners", "sample.Walls"))
        return Mono.just(id);
    }

    @PostMapping("/{id}/start")
    @ResponseStatus(HttpStatus.OK)
    fun start(@PathVariable id: UUID): Mono<UUID> {
        instanceManager.startBattle(id)
        return Mono.just(id);
    }

    @RequestMapping("")
    fun getBattlesEvents() : Flux<List<Battle>> {
        return instanceManager.getBattlesEvents();
    }

    @RequestMapping("/{id}")
    fun getBattleEvents(@PathVariable id: UUID) : Flux<String> {
       return instanceManager.getBattleEvents(id); // TODO move delay to other place
    }
}
