package edu.robocode.service.controllers

import edu.robocode.service.application.IRobotDefinitionsService
import edu.robocode.service.models.RobotDefinitionModel
import javassist.NotFoundException
import org.keycloak.KeycloakPrincipal
import org.keycloak.KeycloakSecurityContext
import org.springframework.context.annotation.Scope
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.context.WebApplicationContext
import java.util.*
import javax.validation.Valid


@RestController
@Scope(value = WebApplicationContext.SCOPE_REQUEST)
@RequestMapping("api/robots-definitions")
@CrossOrigin(origins = ["*"], methods= [RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE])
class RobotsDefinitionController(private val robotDefinitionsService: IRobotDefinitionsService) {

    @GetMapping("")
    fun getAllRobotsDefinitions(principal: KeycloakPrincipal<KeycloakSecurityContext>): List<RobotDefinitionModel> =
        robotDefinitionsService.getAll(principal.name)

    @PostMapping("")
    fun createNewRobotDefinition(
        principal: KeycloakPrincipal<KeycloakSecurityContext>,
        @Valid @RequestBody model: RobotDefinitionModel
    ): RobotDefinitionModel =
        robotDefinitionsService.create(principal.name, model)


    @GetMapping("/{id}")
    fun getRobotDefinition(@PathVariable(value = "id") robotDefinitionId: UUID): ResponseEntity<RobotDefinitionModel> =
        robotDefinitionsService.getById(robotDefinitionId).map { model: RobotDefinitionModel ->
            ResponseEntity.ok(model)
        }.orElse(ResponseEntity.notFound().build())

    @PutMapping("/{id}")
    fun updateRobotDefinition(
        @PathVariable(value = "id") robotDefinitionId: UUID,
        @Valid @RequestBody updatedRobotDefinition: RobotDefinitionModel
    ): ResponseEntity<RobotDefinitionModel> =
        robotDefinitionsService.update(updatedRobotDefinition)
            .map { model ->
                ResponseEntity.ok().body(model)
            }.orElse(ResponseEntity.notFound().build())

    @DeleteMapping("/{id}")
    fun deleteRobotDefinition(@PathVariable(value = "id") robotDefinitionId: UUID): ResponseEntity<Void> =
        try {
            robotDefinitionsService.delete(robotDefinitionId)
            ResponseEntity<Void>(HttpStatus.OK)
        } catch (ex: NotFoundException) {
            ResponseEntity.notFound().build()
        }
}