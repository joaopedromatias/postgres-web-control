# Database Web Interface

To run the app:

```
docker-compose up -d       # runs postgres and localstack containers
```

```
APP_PORT=<PORT> npm run dev       # starts the server on specified port (default is 3000)
```

```
cd frontend && npm run dev       # watch frontend code changes to refresh build files
```

## Objective

The objective of this app is to provide a web interface that allows users to manage postgres databases by running SQL commands, creating tables through UI and uploading csv files to be inserted in tables.

## Technologies

- **Programming Language**: TypeScript

- **Front End**: React, TailwindCSS, React Router

- **Back End**: Fastify, Socket, Streaming, AWS DynamoDB, AWS S3

- **Database**: PostgreSQL

- **Virtualization**: Docker

- **Development Environment**: ESLint, Prettier, Nodemon
