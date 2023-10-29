## GitHub Monitoring API

  A simple RESTful API built with NestJS for monitoring GitHub repositories and their commits.

## Features

- GitHub Integration: Monitor GitHub repositories and receive real-time updates on new commits.
- Authentication: Secure your API endpoints with OAuth 2.0 authentication using GitHub as an identity provider.
- WebSockets: Get real-time notifications about new commits using WebSocket communication.
- Swagger API Documentation: Explore and interact with the API using the built-in Swagger UI.

## Table of Contents

- Prerequisites
- Getting Started
- Project Structure
- Configuration
- Usage
- Endpoints
- Authentication
- WebSocket Integration
- Prerequisites
  
- Before you begin, ensure you have met the following requirements:
  - Node.js and npm installed.

## Getting Started

Clone the repository:

- bash: git clone <https://github.com/your-username/github-monitoring-api.git>
- cd github-monitoring-api

## Install the dependencies

- bash: npm install
Start the application in development mode:
- bash: npm run dev
The API will be available at <http://localhost:3000>.

## Project Structure

The project is structured as follows:

- src: Contains the source code of the application.
- github-api.js: A simple script for fetching GitHub data.
- modules: NestJS modules to organize the application.
- app.controller.ts: The main controller of the application.
- app.service.ts: The main service of the application.
- app.module.ts: The main module of the application.
- main.ts: The entry point of the application.
- test: Contains unit and integration tests.
- test/jest-e2e.json: Jest configuration for end-to-end tests.
- nest-cli.json: NestJS CLI configuration.
- tsconfig.json: TypeScript configuration.
- package.json: Node.js package configuration

## Usage

The API provides various endpoints for monitoring GitHub repositories and commits. You can explore the API's capabilities using Swagger UI, which is available at <http://localhost:3000/api-docs>.

WebSocket Events
new-commit: Receive notifications about new commits in real time.
