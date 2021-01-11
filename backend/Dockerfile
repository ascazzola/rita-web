FROM maven:3.6.3-adoptopenjdk-14 AS MAVEN_BUILD
COPY ./ ./
RUN basedir=$pwd
RUN mvn clean
RUN mvn package

FROM adoptopenjdk/openjdk14:ubi
COPY --from=MAVEN_BUILD /target/api-0.0.1-SNAPSHOT.jar /robocode-service.jar

# set the startup command to execute the jar
CMD ["java", "-jar", "/robocode-service.jar"]