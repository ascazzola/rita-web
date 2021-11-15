package edu.robocode.service.application

import java.io.InputStream

interface IFileStore {
    fun put (id: String, stream: InputStream)
    fun get (id: String) : InputStream
    fun delete (id: String)
    fun exists (id: String) : Boolean
}

