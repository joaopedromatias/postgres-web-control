# Postgres Web Control

## Objective ⛳

The objective of this app is to provide a local web interface that allows developers to manage a postgres database by running queries and uploading csv files to be inserted into the tables.

## Running 🏃

To run the app:

```
docker-compose up -d    # wait 15 seconds and visit localhost:8080
```

## How It Works ⚙️

The `fastify server` is used to deliver Front End files and to provide client-server communication using `Web Socket` (socketIO) and `REST API endpoints`.

The `Front End` was built using `Vite, React, React Router and Tailwind CSS`. The `AWS services (S3 and DynamoDB)` are locally simulated using `LocalStack`.

The application runs in containers composed in `docker-compose.yml`.

The application login is based entirely on the database connection. The React Router root route's `loader function` evaluates and sends all the login information to the server, through `web socket` communication.

The promise regarding the database connection is `defered` from the loader to the component. Inside a useEffect hook, the promise result is evaluated. If the user is connected to the database, then there is a redirection (client side dynamic navigation) to the `/app` route. Otherwise, the user goes to the `/login` form.

The login information is stored using the browser session storage, so it can be re-used through page loads to reconnect the user to the database using web socket communcation.

The database connection is kept on the property `pgClient` of the socket instance on server, which exists for each connected client.

There are 4 main functionalities that uses the socket communication:

- **`Holds client connection to the database`**

- **`Run queries`**

- **`Get tables`**

- **`Insert data into tables`**:

  - The client side gets the presigned URL for the S3 bucket `csv-files` using a REST API endpoint.

  - This url is used to upload the CSV file into the S3 bucket `directly from the web browser`.

  - When the upload is complete, the client emits a web socket message to tell the server that the object is available on the bucket, so it can start to write its data into the specified table.

  - The data is read on the server using `streaming`, so it does not load the entire S3 object on server memory, which could lead to `memory leak` and `thread blocking`.

  - A message is sent to the client saying that the data was sucessfully inserted or that it could not be inserted, showing the error reason.

All valid queries runned by the user are saved into a DynamoDB table called `commands`, which uses the client `sessionId` as its `partition key`. The commands information are fetched on the Front End using an API Rest endpoint.

Both the DynamoDB table and the S3 bucket are created on the server start, using custom fastify plugins.

The web socket communication allows events to flow from client to server and from server to client, which makes it possible to build a more reactive UI. For example, the tables information are resent from the server to the client after each sucessfull query, which updates the UI if a new table is found or if a table was deleted.

The more challenging part of the development was to make the app run inside a docker container. I realized after a long debugging that I needed to wait for some seconds to run the app's code so the localstack endpoints would be ready to accept connections.

## Technologies 🌐

- **Programming Language**: TypeScript

- **Front End**: React, React Router, TailwindCSS, Vite

- **Back End**: Fastify, Web Socket, Streaming, AWS DynamoDB, AWS S3

- **Database**: Postgres

- **Infrastructure**: LocalStack

- **Virtualization**: Docker

- **Development Environment**: ESLint, Prettier, Nodemon
