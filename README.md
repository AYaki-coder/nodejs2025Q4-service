# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker Desktop - [Download & Install Docker](https://www.docker.com/get-started)

## Downloading

```
git clone git@github.com:AYaki-coder/nodejs2025Q4-service.git

```

## Go to inner folder

```
cd ./nodejs2025Q4-service
```

## Go to branch

```
git checkout part3
```

## Create .env file

```
cp ./.env.example ./.env
```

## Running application

```
docker compose up --watch
```

flag `--watch` is necessary for hot reload

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Stop application

```
docker compose down
```

## Testing

## Installing NPM modules

Tests are running out of any container. Install node modules before testing

```
npm install
```

After application running (**Make sure the application is running, it may take some time**) open new terminal and enter:

```
npm run test:auth
```

```
npm run test:refresh
```

If you have a problems with tests try

```
npx prisma migrate reset --force
```

or clear volumes. And try to test again

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
