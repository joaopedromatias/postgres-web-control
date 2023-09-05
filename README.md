# Database Web Interface

To run the app locally,

```
PORT=<PORT> npm run start       # starts the server on specified port (default to 3000)
```

## Objective

The objective of this app is to provide a web interface that allows users to manage relational databases by running SQL commands, creating tables through UI, uploading csv files to be inserted in tables and showing the total amount of current connections to the database.

## Technologies

- **Front End**: React, Context API, Tailwind, React Router

- **Back End**: Fastify, Sequelize, AWS S3 (localstack), AWS Lambda (localstack), Socket

- **Virtualization**: Docker, Docker Compose

- **Development Environment**: TypeScript, ESLint, Prettier
