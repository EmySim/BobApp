# BobApp 🚀  
Collaborative joke application, composed of an Angular front-end and a Spring Boot back-end.

<p align="center">
  <img src="https://img.shields.io/github/workflow/status/EmySim/BobApp/CI%2FCD%20Pipeline?label=CI%2FCD&logo=githubactions&style=for-the-badge" />
  <img src="https://img.shields.io/github/license/EmySim/BobApp?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Angular-18+-dd0031?logo=angular&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?logo=springboot&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/SonarCloud-Quality%20Gate-orange?logo=sonarcloud&logoColor=white&style=for-the-badge" />
</p>

---

##  Prerequisites

**Front-end**  
- [Node.js](https://nodejs.org/) ≥ 18.x  
- npm or yarn

**Back-end**  
- Java ≥ 11 (JDK)  
- [Maven](https://maven.apache.org/)

**Containerization**  
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

---

##  Clone the project

```bash
git clone https://github.com/EmySim/BobApp.git
cd Gerez-un-projet-collaboratif-en-int-grant-une-demarche-CI-CD-main
```

---

##  Run with Docker Compose (recommended)

```bash
docker-compose up --build
```
- Front-end: [http://localhost:8082](http://localhost:8082)
- Back-end: [http://localhost:8080](http://localhost:8080)

---

##  Manual Start

### Front-end

```bash
cd front
npm install
npm run start
```

#### Docker (front)
```bash
docker build -t bobapp-front .
docker run -p 8082:80 --name bobapp-front -d bobapp-front
```

---

### Back-end

```bash
cd back
mvn clean install
mvn spring-boot:run
```

#### Docker (back)
```bash
docker build -t bobapp-back .
docker run -p 8080:8080 --name bobapp-back -d bobapp-back
```

---

##  Tests

### Front-end
```bash
cd front
npm run test
```

### Back-end
```bash
cd back
mvn test
```

---

##  Quality Analysis (SonarCloud)

Configure your SonarCloud environment variables if needed, then run:
```bash
mvn sonar:sonar
```

---

##  Project Structure

```
front/                  # Angular application
back/                   # Spring Boot API
docker-compose.yml      # Service orchestration
sonar-project.properties# SonarCloud configuration
.github/workflows/ci.yml# CI/CD pipeline
```

---

##  CI/CD Workflows

This project uses **GitHub Actions** for CI/CD automation.

- **Continuous Integration (CI):** Unit tests, coverage, SonarCloud Quality Gate.
- **Continuous Delivery (CD):** Docker Hub deployment (only if CI passes).

> Example workflow file (`.github/workflows/ci.yml`):

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      # ---------------------- CI STEPS: BUILD & TEST ----------------------
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Run front tests
        run: |
          cd front
          npm install
          npm run test -- --watch=false --browsers=ChromeHeadless
      
      - name: Set up JDK 11
        uses: actions/setup-java@v3
        with:
          java-version: '11'
          distribution: 'adopt'

      - name: Build and test back
        run: |
          cd back
          mvn clean install
      
      - name: SonarCloud Scan & Quality Gate Check
        uses: SonarSource/sonarcloud-github-action@v2
        with:
          projectBaseDir: .
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}

      # ---------------------- CD STEPS: DOCKER BUILD & PUSH ----------------------
      - name: Build Docker images
        run: docker-compose build

      - name: Docker Login
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Push to Docker Hub
        run: |
          docker push emysim/bobapp-frontend
          docker push emysim/bobapp-backend
```

**Required configuration:**  
Create the above file in `.github/workflows/ci.yml` and configure the secrets in your GitHub repository settings (`SONAR_TOKEN`, `DOCKER_USERNAME`, `DOCKER_PASSWORD`).

---

##  Contributing

If you want to contribute to the project, follow these steps:

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/your-username/BobApp.git
   ```
3. **Create a new branch** for your feature or fix:
   ```bash
   git checkout -b feature/my-feature
   ```
4. **Make your changes** and commit them with clear messages.
5. **Push** your branch to your fork:
   ```bash
   git push origin feature/my-feature
   ```
6. **Open a Pull Request** on the main repository and describe your changes.

Please make sure to:
- Follow the existing code style and conventions.
- Write unit tests for new features or bug fixes.
- Wait for the CI/CD pipeline to pass (tests, quality, and Docker build) before submitting your PR.

Thank you for your contributions! 

---

<p align="center"><b>You're now ready to start working on the project. Good luck! 🍀</b></p>
