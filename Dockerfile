FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY src/main/resources/Quizz/package*.json ./
RUN npm ci
COPY src/main/resources/Quizz/ ./
RUN npm run build

FROM eclipse-temurin:21-jdk AS backend-builder
WORKDIR /opt/app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN chmod +x ./mvnw
RUN ./mvnw dependency:go-offline
COPY ./src ./src

COPY --from=frontend-builder /app/frontend/dist /opt/app/src/main/resources/static

RUN ./mvnw clean install -DskipTests
RUN find ./target -type f -name '*.jar' -exec cp {} /opt/app/app.jar \; -quit

FROM eclipse-temurin:21-jre-alpine
WORKDIR /opt/app
COPY --from=backend-builder /opt/app/app.jar /opt/app/
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/opt/app/app.jar"]