package edu.robocode.service.controllers

import edu.robocode.service.application.BattleParameters
import edu.robocode.service.application.IRobocodeInstanceManager
import edu.robocode.service.application.RobotsParameters
import edu.robocode.service.models.Battle
import edu.robocode.service.models.NewBattle
import edu.robocode.service.models.Robot
import org.springframework.context.annotation.Scope
import org.springframework.web.bind.annotation.*
import org.springframework.web.context.WebApplicationContext
import reactor.core.publisher.Mono
import java.util.*

@RestController
@Scope(value = WebApplicationContext.SCOPE_REQUEST)
@RequestMapping("api/battles")
@CrossOrigin()
class BattlesController(private val instanceManager: IRobocodeInstanceManager) {

    @GetMapping("")
    fun getBattles() : Mono<List<Battle>> {
        return instanceManager.getBattles();
    }

    @PostMapping("")
    fun create(@RequestBody battle: NewBattle) : Mono<UUID> {
        val (numberOfRounds, inactivityTime, gunCoolingRate, predefinedRobots, userRobots, battlefieldSpecification)
        = battle.specification
        val robotParameters = RobotsParameters(predefinedRobots, userRobots)
        val params = BattleParameters(battle.name, numberOfRounds, inactivityTime, gunCoolingRate, robotParameters,
            battlefieldSpecification)
        val id = instanceManager.newBattle(params)
        return Mono.just(id);
    }

    @GetMapping("/{id}")
    fun getBattleDetails(@PathVariable id: UUID): Mono<Battle>  {
        return instanceManager.getBattle(id);
    }

    @PostMapping("/{id}/start")
    fun start(@PathVariable id: UUID): Mono<UUID> {
        instanceManager.startBattle(id)
        return Mono.just(id);
    }
}
