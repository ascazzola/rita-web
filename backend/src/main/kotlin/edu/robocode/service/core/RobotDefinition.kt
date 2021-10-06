package edu.robocode.service.core

import org.hibernate.annotations.Type
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Lob
import javax.validation.constraints.NotBlank

@Entity
data class RobotDefinition(
    @Column(nullable = false)
    val userId: String,
    @NotBlank()
    @Column(length = 50, nullable = false)
    var name: String,
    @NotBlank
    @Column(nullable = false)
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    var code: String,
    @NotBlank
    @Column(nullable = false)
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    var xml: String
) : BaseEntity() {
    protected constructor() : this("", "", "", "")
}