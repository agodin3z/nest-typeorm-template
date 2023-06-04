# TypeORM + NestJS API Template

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Tech Stack

- [NestJS](https://nestjs.com/) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- [TypeORM](https://typeorm.io/) - An ORM that can run many platforms and can be used with TypeScript and JavaScript.
- [Jest](https://jestjs.io/) - Delightful JavaScript Testing Framework with a focus on simplicity.
- [Husky](https://typicode.github.io/husky/) - Git hooks made easy dog woof!
- [ESLint](https://eslint.org/) - Find and fix problems in your JavaScript code.
- [Prettier](https://prettier.io/) - An opinionated code formatter.
- [Lint Staged](https://github.com/okonet/lint-staged) - Run linters on git staged files.
- [CommitLint](https://commitlint.js.org/) - Lint commit messages.

## Prerequisites

- [Volta](https://volta.sh/)* (node, npm, and yarn version manager)

> \* Optional dependency, alternatives: [n](https://github.com/tj/n) or [nvm](https://github.com/nvm-sh/nvm)

### Optional Development Prerequisites

Install the following dependencies:

- [Docker Desktop](https://docs.docker.com/desktop/) (An one-click-install application that enables you to build and share containerized applications and microservices.)
- [Docker Compose](https://docs.docker.com/compose/install/) (Plugin for running multi-container Docker applications)

Then create a `docker.env` file with the following values:

```env
MYSQL_DATABASE=awesome_db
MYSQL_USER=user
MYSQL_PASSWORD=passwd
MYSQL_ROOT_PASSWORD=secret_passwd
```

Finally, run docker containers from `docker-compose.yml` file with `docker-compose up -d` command or run it with Docker Desktop.

## Getting Started

### Enviroment config

Create a copy of `.env.example` with the name `.env` and `.env.test.example` with the name `.env.test` and placed it at the root of the project

```bash
  cp .env.example .env
  cp .env.test.example .env.test
```

Replace its values with your own credentials.

### Install Dependencies

Run the following commands to install all dependencies:

```bash
  volta install node
  volta install yarn
  yarn
```

## Development server

Run `yarn start:dev` to start a development server that watch for changes. For a debug server use: `yarn start:debug`

## Running unit tests

Run `yarn test` to execute the unit tests via [Jest](https://jestjs.io/). For coverage test use: `yarn test:cov`

## Build for production

Run `yarn build` to compile for production, this will execute `prebuild` and `postbuild` commands automatically. Then run `yarn start:prod` to start a production server.

## Scripts API Reference

### Server

| Script             | Description                               |
| :----------------- | :---------------------------------------- |
| `yarn start`       | Start server (without watch)              |
| `yarn start:dev`   | Start development server                  |
| `yarn start:debug` | Start debug development server            |
| `yarn start:prod`  | Start production server                   |
| `yarn pm2`         | Run production server as Cluster with PM2 |
| `yarn pm2:restart` | Reload API with PM2                       |
| `yarn pm2:stop`    | Stop PM2 service                          |
| `yarn pm2:logs`    | View PM2 logs                             |

### Build

| Script           | Description              |
| :--------------- | :----------------------- |
| `yarn prebuild`  | Clean dist folder        |
| `yarn build`     | Build project            |

### Lint & Format

| Script        | Description                |
| :------------ | :------------------------- |
| `yarn format` | Format files with Prettier |
| `yarn lint`   | Lint files with ESLint     |

### Tests

| Script            | Description              |
| :---------------- | :----------------------- |
| `yarn test`       | Run test (without watch) |
| `yarn test:watch` | Run test and watch       |
| `yarn test:cov`   | Run coverage test        |
| `yarn test:e2e`   | Run end-to-end tests     |
| `yarn test:debug` | Debug tests              |

### TypeORM

| Script                        | Description                                                                    |
| :---------------------------- | :----------------------------------------------------------------------------- |
| `yarn typeorm`                | Access to TypeORM CLI commands.                                                |
| `yarn migrations`             | Applies all pending migrations, and creates the database if it does not exist. |
| `yarn migrations:create`      | Creates a new migration file.                                                  |
| `yarn migrations:test`        | Run migrations for test                                                        |
| `yarn migrations:revert`      | Revert migrations in DB                                                        |
| `yarn migrations:revert:test` | Revert migrations in test DB                                                   |
| `yarn migrations:generate`    | Generate a migration from existing table schema and entities                   |
| `yarn seeds`                  | Polulate DB with seed data                                                     |

> For more information on TypeORM, read the [official documentation](https://typeorm.io/using-cli)

### Misc

| Script                 | Description                                                            |
| :--------------------- | :--------------------------------------------------------------------- |
| `docker-compose up -d` | Builds, (re)creates, starts, and attaches to containers for a service. |
