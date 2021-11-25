package edu.robocode.service.application

import java.io.File
import java.io.InputStream

interface IJavaCompilerService {
    fun compile(className: String, code: String): JavaCompilerResult
}

data class JavaCompilerResult(val stream: InputStream, val size: Long)


