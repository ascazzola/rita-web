package edu.robocode.service.core

import java.util.*
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Lob
import javax.validation.constraints.NotBlank

@Entity
data class RobotDefinition(
    @Column(nullable = false)
    val userId: UUID = UUID.randomUUID(), // TODO create validator
    @NotBlank()
    @Column(length = 50, nullable = false)
    var name: String = "",
    @NotBlank
    @Column(nullable = false)
    @Lob
    var sourceCode: String = ""
) : BaseEntity()