package edu.robocode.service.core

import javax.persistence.Entity
import javax.validation.constraints.NotBlank

@Entity
data class RobotDefinition(
    @get: NotBlank
    val title: String = ""
) : BaseEntity()