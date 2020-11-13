<p>
  <img src="https://avatars2.githubusercontent.com/u/11575058?s=400&u=0a53313f7d7230104259cde85dcf755a85af186a&v=4" width="160" alt="App Logo" />
</p>

## Description

Basic NestJS + MongoDB app, in order to learn NestJS framework.

## Installation

Needs an .env file at root folder, with following content :
```bash
MONGO_DB_URL=<url>
MONGO_DB_USER=<user>
MONGO_DB_PASSWORD=<passwd>
```

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker

```bash
# build
$ sudo docker build -t items-api .

# run
$ sudo docker run --p 3000:3000 items-api
```
