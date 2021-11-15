package edu.robocode.service.application

import org.springframework.stereotype.Service
import java.io.*
import java.net.URI
import java.nio.file.Files
import javax.tools.ToolProvider

@Service
class JavaCompilerService : IJavaCompilerService {

    override fun compile(className: String, code: String): InputStream {
        val dir = Files.createTempDirectory("temp")
        val filePath = "$dir/$className.java";

        val writer = BufferedWriter(FileWriter(filePath));
        writer.write(code)
        writer.close();

        val compiler = ToolProvider.getSystemJavaCompiler()
        val result = compiler.run(
            null, null, null,
            filePath
        );

        if (result != 0) {
            throw Exception("Cannot compile java file $className result is $result")
        }

        val bytes = File("$dir/$className.class").inputStream().readBytes()
        return ByteArrayInputStream(bytes)
    }
}