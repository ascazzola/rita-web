package edu.robocode.service.application

import java.io.InputStream

interface IJavaCompilerService {
    fun compile(className: String, code: String): InputStream
}


