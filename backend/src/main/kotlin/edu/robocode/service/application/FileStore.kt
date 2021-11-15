package edu.robocode.service.application

import edu.robocode.service.config.MinioConfiguration
import io.minio.*
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.io.InputStream

@Service
class FileStore: IFileStore {
    @Suppress("JoinDeclarationAndAssignment")
    private val minioClient: MinioClient;
    private val logger: Logger = LoggerFactory.getLogger(FileStore::class.java)
    private val bucketName: String
    private val chunkSize: Long = 256 * 1024 * 1024

    constructor(minioConfiguration: MinioConfiguration) {
        minioClient =  MinioClient.builder()
            .credentials(minioConfiguration.accessKey, minioConfiguration.secretKey)
            .endpoint(minioConfiguration.host, minioConfiguration.port.toInt(), false)
            .build()
        bucketName = minioConfiguration.bucketName
        addBucketIfDoesNotExists()
    }

    private fun addBucketIfDoesNotExists() {
        val found = this.minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build())
        if (!found) {
            minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build())
            logger.info("""Created new bucket $bucketName""")
        } else {
            logger.debug("""Bucket $bucketName already exists""")
        }
    }

    override fun put(id: String, stream: InputStream) {
        val params = PutObjectArgs.builder()
            .bucket(bucketName).stream(stream, stream.available().toLong(), chunkSize)
            .`object`(id)
            .build()
      minioClient.putObject(params)
    }

    override fun get(id: String): InputStream {
        val params = GetObjectArgs.builder().bucket(bucketName).`object`(id).build()
        return minioClient.getObject(params)
    }

    override fun delete(id: String) {
        val params = RemoveObjectArgs.builder().bucket(bucketName).`object`(id).build()
        minioClient.removeObject(params)
    }

    override fun exists(id: String): Boolean {
        throw TODO()
    }
}