# Spotlight

This app shows a list of upcoming movies using the TMDb API.

The project uses JavaScript both in the backend and frontend. To the backend, the ExpressJS was chosen because of its simplicity, performance, deployability.

I also used sqlite3 and graphql. The sqlite3 database to storage all upcoming movies fetched from TMDb, and graphql as API technology. I'm not a novice in graphql, and I didn't use this on my regular job. It's the very first time that I use a backend written in JavaScript, and also graphql. Apologies if I missed something, but I enjoy to used the test to learn new things.

To frontend, I use VueJS, just because I like it to small and quick projects.

Business Rules I add by myself in this project:

- Fetch all Upcoming movies and save them to the database;
- Data in the database will expire one day;
- If the data was expired a new search it's enough to persist it again.
- I prefer to not use any front-end frameworks.

Another libraries/technologies used:
- node 10.16.3
  - The JavaScript runner and compiler.
- npm 6.9.0
  - Package manager
- sass-loader
  - Sass compiler
- moment.js
  - Date parser and format JavaScript lib
- dotenv
  - Get confidencial data on enviroment
- axios
  - HTTP client to nodejs
- express-graphql
  - Extension to use graphql on Express
- sqlite3
  - Simple memory or file based database
- Cypress
  - E2E tests

## Project setup

Clone or download the repository. Then run:

```
npm install
```

Use the `.env.template` file as an example to create your `.env` file.
The env file should be placed at the project root.

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests

This project uses Cypress as e2e test tool. To run e2s test:

```
npm run tests:e2s
```

### Lints and fixes files
```
npm run lint
```

### Run API
```
npm run express
```
