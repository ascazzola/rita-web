package edu.robocode.service.controllers

import edu.robocode.service.application.IRobocodeInstanceManager
import org.springframework.context.annotation.Scope
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.context.WebApplicationContext

@RestController
@Scope(value = WebApplicationContext.SCOPE_REQUEST)
@RequestMapping("/api")
class HomeController {
    val instanceManager: IRobocodeInstanceManager;

    constructor(instanceManager: IRobocodeInstanceManager) {
        this.instanceManager = instanceManager
    }
    @RequestMapping("/hello")
    fun hello() : String {
        val battle = instanceManager.newBattle(1,450, 0.1, arrayOf("sample.Corners", "sample.Walls"))
        return battle.toString();
    }
}