package edu.robocode.service.controllers

import edu.robocode.service.core.RobotDefinition
import org.springframework.context.annotation.Scope
import org.springframework.data.jpa.repository.JpaRepository
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
class RobotsDefinitionController(private val repository: JpaRepository<RobotDefinition, UUID>) {
    @GetMapping("")
    fun getAllRobotsDefinitions(): List<RobotDefinition> =
        repository.findAll()

    @PostMapping("")
    fun createNewRobotDefinition(@Valid @RequestBody robotDefinition: RobotDefinition): RobotDefinition =
        repository.save(robotDefinition)


    @GetMapping("/{id}")
    fun getRobotDefinition(@PathVariable(value = "id") robotDefinitionId: UUID): ResponseEntity<RobotDefinition> {
        return repository.findById(robotDefinitionId).map { robotDefinition ->
            ResponseEntity.ok(robotDefinition)
        }.orElse(ResponseEntity.notFound().build())
    }

    @PutMapping("/{id}")
    fun updateRobotDefinition(@PathVariable(value = "id") robotDefinitionId: UUID,
                          @Valid @RequestBody updatedRobotDefinition: RobotDefinition): ResponseEntity<RobotDefinition> {

        return repository.findById(robotDefinitionId).map { existingRobotDefinition -> // TODO create base repository with update method
            if(existingRobotDefinition.version != updatedRobotDefinition.version){
                throw OptimisticLockException()
            }
            existingRobotDefinition.name = updatedRobotDefinition.name;
            existingRobotDefinition.sourceCode = updatedRobotDefinition.sourceCode;
            ResponseEntity.ok().body(repository.save(existingRobotDefinition))
        }.orElse(ResponseEntity.notFound().build())

    }

    @DeleteMapping("/{id}")
    fun deleteRobotDefinition(@PathVariable(value = "id") robotDefinitionId: UUID): ResponseEntity<Void> {

        return repository.findById(robotDefinitionId).map { robotDefinition  ->
            repository.delete(robotDefinition)
            ResponseEntity<Void>(HttpStatus.OK)
        }.orElse(ResponseEntity.notFound().build())
    }
}