package edu.robocode.service.controllers

import org.keycloak.KeycloakPrincipal
import org.keycloak.KeycloakSecurityContext
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono

@RestController
@RequestMapping("api/")
class HomeController {

    @GetMapping("version")
    fun getVersion() : Mono<VersionInfo> {
        return  Mono.just(VersionInfo("1.0.0")) //TODO create version management
    }

    @GetMapping("me")
    fun getVersion(principal: KeycloakPrincipal<KeycloakSecurityContext>) : Mono<String> {
        return  Mono.just(principal.name) //TODO create version management
    }
}

data class VersionInfo (val number: String) {
}