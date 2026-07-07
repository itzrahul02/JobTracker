# Job Application Tracker

A full-stack job application tracker built with React, TypeScript, Node.js, Express, MongoDB, JWT authentication, Swagger, and Docker.

## Features

- Candidate registration, login, dashboard, profile, job browsing, application tracking, and filtering
- Admin dashboard, job management, candidate management, application management, status updates, and notes
- Role-based authorization and protected APIs
- Swagger API documentation at /api-docs
- Dockerized frontend, backend, and database

## Folder Structure

- client/src for the React frontend
- server/src for the Express backend
- docker-compose.yml for local containerized setup

## Technologies Used

- Frontend: React, TypeScript, React Router, Axios
- Backend: Node.js, Express, TypeScript, MongoDB, JWT, bcrypt, Zod, Swagger
- Deployment: Docker, Docker Compose

## Installation

### Local Development

1. Copy server/.env.example to server/.env and update values
2. Install dependencies:
   - cd server && npm install
   - cd ../client && npm install
3. Start MongoDB and run the backend/frontend

### Docker Setup

Run:

```bash
docker compose up --build
```

The app will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Swagger: http://localhost:5000/api-docs

## Environment Variables

Create a server/.env file with:

- PORT
- NODE_ENV
- MONGODB_URI
- DB_NAME
- JWT_SECRET
- CLIENT_URL

## Future Improvements

- Add pagination and richer analytics charts
- Add email notifications
- Add admin note editing and file uploads
