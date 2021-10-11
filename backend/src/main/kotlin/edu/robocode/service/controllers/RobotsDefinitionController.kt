package edu.robocode.service.controllers

import edu.robocode.service.application.IMapper
import edu.robocode.service.core.IRobotsDefinitionRepository
import edu.robocode.service.core.RobotDefinition
import edu.robocode.service.models.RobotDefinitionModel
import org.keycloak.KeycloakPrincipal
import org.keycloak.KeycloakSecurityContext
import org.springframework.context.annotation.Scope
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.context.WebApplicationContext
import java.util.*
import javax.persistence.OptimisticLockException
import javax.validation.Valid


@RestController
@Scope(value = WebApplicationContext.SCOPE_REQUEST)
@RequestMapping("api/robots-definitions")
@CrossOrigin()
class RobotsDefinitionController(
    private val repository: IRobotsDefinitionRepository,
    private val mapper: IMapper<RobotDefinition, RobotDefinitionModel>
) {
    @GetMapping("")
    fun getAllRobotsDefinitions(principal: KeycloakPrincipal<KeycloakSecurityContext>): List<RobotDefinitionModel> =
        repository.findByUserName(principal.name).map { x -> mapper.map(x) }

    @PostMapping("")
    fun createNewRobotDefinition(
        principal: KeycloakPrincipal<KeycloakSecurityContext>,
        @Valid @RequestBody model: RobotDefinitionModel
    ): RobotDefinitionModel {
        val userId = principal.name;
        var entity = RobotDefinition(userId, model.name, model.code, model.xml)
        entity = repository.save(entity);
        return mapper.map(entity);
    }

    @GetMapping("/{id}")
    fun getRobotDefinition(@PathVariable(value = "id") robotDefinitionId: UUID): ResponseEntity<RobotDefinitionModel> {
        return repository.findById(robotDefinitionId).map { robotDefinition ->
            ResponseEntity.ok(mapper.map(robotDefinition))
        }.orElse(ResponseEntity.notFound().build())
    }

    @PutMapping("/{id}")
    fun updateRobotDefinition(
        @PathVariable(value = "id") robotDefinitionId: UUID,
        @Valid @RequestBody updatedRobotDefinition: RobotDefinitionModel
    ): ResponseEntity<RobotDefinitionModel> {

        return repository.findById(robotDefinitionId)
            .map { existingRobotDefinition -> // TODO create base repository with update method
                if (existingRobotDefinition.version != updatedRobotDefinition.version) {
                    throw OptimisticLockException()
                }
                existingRobotDefinition.name = updatedRobotDefinition.name;
                existingRobotDefinition.xml = updatedRobotDefinition.xml;
                existingRobotDefinition.code = updatedRobotDefinition.code;
                ResponseEntity.ok().body(mapper.map(repository.save(existingRobotDefinition)))
            }.orElse(ResponseEntity.notFound().build())

    }

    @DeleteMapping("/{id}")
    fun deleteRobotDefinition(@PathVariable(value = "id") robotDefinitionId: UUID): ResponseEntity<Void> {

        return repository.findById(robotDefinitionId).map { robotDefinition ->
            repository.delete(robotDefinition)
            ResponseEntity<Void>(HttpStatus.OK)
        }.orElse(ResponseEntity.notFound().build())
    }
}