# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone -b postgres-docker https://github.com/KalinkinFiz/nodejs2022Q4-service.git
```

## Installing NPM modules

```
npm install
```

## ❗❗❗Rename `.env.example` to `.env`❗❗❗

---

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Or Running via docker

Run in terminal:

```
 docker-compose up
```

If you want to stop, press the keyboard shortcut first **Ctrl+C**, then enter in the terminal:

```
 docker-compose down
```

Rebuild images & start containers:

```
 docker compose up --build
```

Сonnected services:

- Node
- PostgreSQL
- pgAdmin (http://localhost:5050/)


## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
