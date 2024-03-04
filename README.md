Passkeys Express App

This project demonstrates a simple application utilizing the Web Authentication API (WebAuthn) for authentication through Passkeys. Built with Express.js, it showcases how servers can register and authenticate users using public key cryptography instead of passwords.

🚧 Caveat

WebAuthn is an emerging technology. Although it's supported in most major browsers, it's important to note that Firefox offers only partial support, lacking compatibility with TouchID at this time.

📌 Scope

This tutorial focuses solely on the "happy path" of implementation, deliberately omitting aspects such as:

Security considerations
Error handling
Form data validation
Authentication edge cases

📋 Prerequisites

Docker: This tutorial uses Docker for local development. Ensure Docker is installed and running on your machine. Download Docker.

🛠 Setting Up

1. Project Initialization
   Change into your projects directory and create a new project directory:

mkdir passkeys-express

cd passkeys-express

2. Docker Configuration
   Create the necessary Docker configuration files:

touch Dockerfile docker-compose.yml .dockerignore

Dockerfile
Start by defining the Node.js environment in your Dockerfile:

dockerfile

FROM node:19
WORKDIR /usr/src/app
docker-compose.yml
Define the service configuration in docker-compose.yml:

yml

version: "3.8"

services:
web:
build: .
ports: - "3000:3000"
volumes: - .:/usr/src/app

.dockerignore

Inform Docker which files to ignore:
node_modules
npm-debug.log

3. Running the Container
   Build and start your Docker container:

docker compose up
Access the container shell:

docker compose run --service-ports web bash

4. Application Setup
   Initialize the project with npm and install Express.js:

npm init --yes
npm install express --save
Create an index.js file and populate it with a simple Express.js server setup.

5. Development Workflow Improvements
   To facilitate development, install nodemon as a dev dependency:

docker compose exec web npm install nodemon --save-dev
Use nodemon to automatically restart the server upon changes:

npx nodemon index.js 6. Dockerfile and docker-compose.yml Adjustments
Modify the Dockerfile and docker-compose.yml to automate dependency installation and enhance the development workflow.

🚀 Running the App

With the Docker environment configured, simply run:

bash
Copy code
docker compose up
Visit http://localhost:3000/ to see the application running.

📦 Final Dockerfile Configuration

Ensure your Dockerfile is finalized to copy your application files, expose the necessary port, and specify the startup command.
