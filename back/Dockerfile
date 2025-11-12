# Build stage using Maven with JDK 17
FROM maven:3.8.7-jdk-17-slim AS build
RUN mkdir -p /workspace
WORKDIR /workspace
COPY pom.xml /workspace
COPY src /workspace/src
# build without tests in docker build (CI runs tests); keep same goals as before
RUN mvn -B -f pom.xml clean package -DskipTests

# Runtime stage using Temurin 17
FROM eclipse-temurin:17-jre
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
COPY --from=build /workspace/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar","app.jar"]