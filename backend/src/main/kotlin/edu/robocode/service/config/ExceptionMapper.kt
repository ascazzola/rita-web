package edu.robocode.service.config

import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler
import javax.persistence.OptimisticLockException


@ControllerAdvice
class RestResponseEntityExceptionHandler : ResponseEntityExceptionHandler() {
    @ExceptionHandler(value = [OptimisticLockException::class])
    protected fun handleConflict(
        ex: RuntimeException, request: WebRequest?
    ): ResponseEntity<Any> {
        val bodyOfResponse = "Conflict persisting entity version mismatch"
        return handleExceptionInternal(
            ex, bodyOfResponse,
            HttpHeaders(), HttpStatus.CONFLICT, request!!
        )
    }
}