package edu.robocode.service.controllers

import edu.robocode.service.core.RobotDefinition
import org.springframework.context.annotation.Scope
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.context.WebApplicationContext
import javax.validation.Valid


@RestController
@Scope(value = WebApplicationContext.SCOPE_REQUEST)
@RequestMapping("api/robots-definitions")
@CrossOrigin()
class RobotsDefinitionController(private val repository: JpaRepository<RobotDefinition, Long>) {
    @GetMapping("")
    fun getAllRobotsDefinitions(): List<RobotDefinition> =
        repository.findAll()

    @PostMapping("")
    fun createNewRobotDefinition(@Valid @RequestBody robotDefinition: RobotDefinition): RobotDefinition =
        repository.save(robotDefinition)


    @GetMapping("/{id}")
    fun getRobotDefinition(@PathVariable(value = "id") robotDefinitionId: Long): ResponseEntity<RobotDefinition> {
        return repository.findById(robotDefinitionId).map { article ->
            ResponseEntity.ok(article)
        }.orElse(ResponseEntity.notFound().build())
    }

    @PutMapping("/{id}")
    fun updateRobotDefinition(@PathVariable(value = "id") robotDefinitionId: Long,
                          @Valid @RequestBody newRobotDefinition: RobotDefinition): ResponseEntity<RobotDefinition> {

        return repository.findById(robotDefinitionId).map { existingRobotDefinition ->
            val updatedArticle: RobotDefinition = existingRobotDefinition
                .copy(
                    userId = newRobotDefinition.userId,
                    name = newRobotDefinition.name,
                    sourceCode = newRobotDefinition.sourceCode
                )

            ResponseEntity.ok().body(repository.save(updatedArticle))
        }.orElse(ResponseEntity.notFound().build())

    }

    @DeleteMapping("/{id}")
    fun deleteRobotDefinition(@PathVariable(value = "id") robotDefinitionId: Long): ResponseEntity<Void> {

        return repository.findById(robotDefinitionId).map { article  ->
            repository.delete(article)
            ResponseEntity<Void>(HttpStatus.OK)
        }.orElse(ResponseEntity.notFound().build())
    }
}