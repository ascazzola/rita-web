package edu.robocode.service.application

import org.springframework.stereotype.Service
import java.io.*
import java.nio.file.Files
import javax.tools.ToolProvider

@Service
class JavaCompilerService : IJavaCompilerService {

    override fun compile(className: String, code: String): JavaCompilerResult {
        val dir = Files.createTempDirectory("robocode.compile")
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


        val compiledFile = File("$dir/$className.class")
        val compiledStream = ByteArrayInputStream(compiledFile.inputStream().readBytes())
        val size = compiledFile.length()
        val originalFile = File(filePath)
        originalFile.delete()
        compiledFile.delete()
        compiledFile.parentFile.delete()
        return JavaCompilerResult(compiledStream, size)
    }
}