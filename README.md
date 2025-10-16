# BobApp

Collaborative joke application, composed of an Angular front-end and a Spring Boot back-end.

---

## Prerequisites

for the front-end : Node.js ≥ 18.x
- [Node.js](https://nodejs.org/) 
- npm ou yarn

for the back-end : 
- Java ≥ 17 (JDK)
- [Maven](https://maven.apache.org/)

For containerization
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

---

## Clone the project

> Clone the repository:
```bash
git clone https://github.com/EmySim/BobApp.git
cd Gerez-un-projet-collaboratif-en-int-grant-une-demarche-CI-CD-main
```

---

## Run with Docker Compose (recommended)

> Build and start all services:
```bash
docker-compose up --build
```
- The front-end will be available at [http://localhost:8082](http://localhost:8082)
- The back-end will be available at [http://localhost:8080](http://localhost:8080)

---

## Manual Start

### Front-end

> Go inside the front folder:
```bash
cd front
```

> Install dependencies:
```bash
npm install
```

> Launch the front-end:
```bash
npm run start
```

#### Docker (front)

> Build the container:
```bash
docker build -t bobapp-front .
```

> Start the container:
```bash
docker run -p 8082:80 --name bobapp-front -d bobapp-front
```

---

### Back-end

> Go inside the back folder:
```bash
cd back
```

> Install dependencies:
```bash
mvn clean install
```

> Launch the back-end:
```bash
mvn spring-boot:run
```

#### Docker (back)

> Build the container:
```bash
docker build -t bobapp-back .
```

> Start the container:
```bash
docker run -p 8080:8080 --name bobapp-back -d bobapp-back
```

---

## Tests

### Front-end

> Run front-end tests:
```bash
cd front
npm run test
```

### Back-end

> Run back-end tests:
```bash
cd back
mvn test
```

---

## Quality Analysis (SonarCloud)

> Configure your SonarCloud environment variables if needed, then run:
```bash
mvn sonar:sonar
```

---

## Project Structure

- `front/` : Angular application
- `back/` : Spring Boot API
- `docker-compose.yml` : Service orchestration
- `sonar-project.properties` : SonarCloud configuration

---

## CI/CD Workflows

This project uses GitHub Actions for CI/CD automation:

- **Build**: Compile front-end and back-end on each push or pull request.
- **Tests**: Run unit tests for Angular and Spring Boot.
- **SonarCloud Analysis**: Code quality and coverage analysis.
- **Docker**: Build and publish Docker images if needed.

> Example workflow file (`.github/workflows/ci.yml`):

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      # Set up Node.js for front-end
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      # Install front-end dependencies
      - name: Install front dependencies
        run: |
          cd front
          npm install

      # Run front-end tests
      - name: Run front tests
        run: |
          cd front
          npm run test -- --watch=false

      # Set up JDK 11 for back-end
      - name: Set up JDK 11
        uses: actions/setup-java@v3
        with:
          java-version: '11'
          distribution: 'adopt'

      # Build and test back-end
      - name: Build and test back
        run: |
          cd back
          mvn clean install

      # SonarCloud analysis
      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@v2
        with:
          projectBaseDir: .
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}

      # Build Docker images
      - name: Build Docker images
        run: docker-compose build
```

> To enable CI/CD, create the above file in `.github/workflows/ci.yml` and configure the required secrets (e.g., `SONAR_TOKEN`).

---

## Author

OpenClassrooms Project – BobApp
