package edu.robocode.service.core

import org.springframework.data.domain.Persistable
import java.util.*
import javax.persistence.Column
import javax.persistence.Id
import javax.persistence.MappedSuperclass
import javax.persistence.Version

@MappedSuperclass
abstract class BaseEntity(givenId: UUID? = null) {

    @Id
    @Column(name = "id", length = 16, unique = true, nullable = false)
    val id: UUID = givenId ?: UUID.randomUUID()

    @Version
    val version: Long? = null

    override fun hashCode(): Int = id.hashCode()

    override fun equals(other: Any?): Boolean {
        return when {
            this === other -> true
            other == null -> false
            other !is BaseEntity -> false
            else -> id == other.id
        }
    }
}