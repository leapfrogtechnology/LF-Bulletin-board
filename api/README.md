<h1 align="center">Bulletin Board API with Express.js</h1>

## Prerequisites

- [Node.js](https://yarnpkg.com/en/docs/install)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [NPM](https://docs.npmjs.com/getting-started/installing-node)
- [PostgreSQL](https://www.postgresql.org/download/) / [MySQL](https://www.mysql.com/downloads/) / [SQLite](https://www.sqlite.org/download.html)

## File structure

```
src/
├── controllers/  => Route Controllers
├── db/           => Database file location used by sqlite
├── docs/         => API Docs
├── middlewares/  => Handler for request before Request is passed to Controller
├── migrations/   => Migration file to update/rollback the database changes
├── models/       => Database access model based on tables
├── seeds/        => Add data to table
├── services/     => Services folder can by API/Authentication/Validation
├── utils/        => helper functions
└── validators/   => validate the request data/request body of user
```

## Setup

#### Install dependencies

```bash
# Using npm
$ cd api
$ npm install

# Or using yarn
$ cd api
$ yarn
```

#### Make a copy of `.env.example` as `.env` and update your application details and database credentials.

```bash
$ cp .env.example .env
```

#### Adjust the following information on the `.env`

```
# Application
PORT=8848
HOST=127.0.0.1

# Environment (e.g: development/test/production)
NODE_ENV=development

# Database
# Either one of DB required (sqlite/pg/mysql)
DB_CLIENT=mysql
DB_NAME=<database_name>(eg:bulletindb)


# For sqlLite only
DB_FILE=/db/<database_filename>(eg:bulletin_board.db)

# For Other DB (pg,mysql)
DB_PORT=pg:'5432', mysql:3306
DB_HOST='localhost'
DB_USER='username'
DB_PASSWORD='password'

# Test Environment
TEST_DB_PORT=pg:'5432', mysql:3306
TEST_DB_HOST='localhost'
TEST_DB_USER='username'
TEST_DB_PASSWORD='password'
TEST_DB_NAME=<test_database_name>

# Google CLIENT ID //check in react
GOOGLE_CLIENT_ID=
GOOGLE_SECRET=

# For AWS Lambda Deployment Only (e.g: /tmp/.babel.json)
BABEL_CACHE_PATH=
```

Configure Different Databases using the [Using Different Database Guide](#using-different-database-guide)

<br>

### Migrations for the `api`

#### Run Migrations

```bash
# Using npm
$ npm run migrate

# Or using yarn
$ yarn migrate
```

#### Rollback Migration

```bash
# Using npm
$ npm run rollback

# Or using yarn
$ yarn rollback
```

#### Create New Migration

```bash
# Using npm
$ npm run make:migration <name>

# Or using yarn
$ yarn make:migration <name>
```

Example:

    $ yarn make:migration create_tags_table

<br>

### Seed Users (Add required user)

#### Run Existing seed

```bash
# Using npm
$ npm run seed

# Or using yarn
$ yarn seed
```

#### Create New seed

```bash
# Using npm
$ npm run make:seeder <name>

# Or using yarn
$ yarn make:seeder <name>
```

Example:

    $ yarn make:seeder 02_insert_tags

<br>

## For Development

### Start the `api`

```bash
# Using npm
$ npm run start:dev

# Or using yarn
$ yarn start:dev
```

<br>

## For Production

### Start the `api`

```bash
# Using npm
$ npm run build
$  NODE_ENV=production npm start

# Or using yarn
$ yarn build
$  NODE_ENV=production yarn start
```

<br>

## Using Different Database Guide

### 1. Using sqlite instead of PostgreSQL and MySQL

#### Create a `db` file on the `api`

```
$ cd bulletin-board/api/src/db/
$ touch bulletin_board.db
```

Update the .env file

```diff
# Database
- DB_CLIENT=mysql
+ DB_CLIENT=sqlite
  DB_NAME=<database_name>(eg:bulletindb)

# For sqlLite only
- DB_FILE=/db/<database_filename>(eg:bulletin_board.db)
+ DB_FILE=/db/bulletin_board.db

- # For Other DB (pg,mysql)
- DB_PORT=pg:'5432', mysql:3306
- DB_HOST='localhost'
- DB_USER='username'
- DB_PASSWORD='password'
```

You can remove the [pg](https://www.npmjs.com/package/pg) and [mysql](https://www.npmjs.com/package/mysql) driver if you like to.

    $ yarn remove pg mysql

<br>

### 2. Using MySQL instead of PostgreSQL or sqlite

Update these lines in your `.env` file.

```diff
# Database
+ DB_CLIENT=mysql
+ DB_NAME=<database_name>(eg:bulletindb)

- # For sqlLite only
- DB_FILE=/db/<database_filename>(eg:bulletin_board.db)

# For Other DB (pg,mysql)
- DB_PORT=pg:'5432', mysql:3306
+ DB_PORT='3306'
+ DB_HOST='localhost'
+ DB_USER='username'
+ DB_PASSWORD='password'
```

You can remove the [pg](https://www.npmjs.com/package/pg) and [sqlite3](https://www.npmjs.com/package/sqlite3) driver if you like to.

    $ yarn remove pg sqlite3

<br>

### 3. Using PostgreSQL instead of MySQL or sqlite

Update these lines in your `.env` file.

```diff
# Database
- DB_CLIENT=mysql
+ DB_CLIENT=pg
+ DB_NAME=<database_name>(eg:bulletindb)

- # For sqlLite only
- DB_FILE=/db/<database_filename>(eg:bulletin_board.db)

# For Other DB (pg,mysql)
- DB_PORT=pg:'5432', mysql:3306
+ DB_PORT='5432'
+ DB_HOST='localhost'
+ DB_USER='username'
+ DB_PASSWORD='password'
```

You can remove the [mysql](https://www.npmjs.com/package/mysql) and [sqlite3](https://www.npmjs.com/package/sqlite3) driver if you like to.

    $ yarn remove pg mysql

<br>

<br>
That's it, you are ready to roll.

## Tests

To run the tests you need to create a separate test database. Don't forget to update your `.env` file to include the connections for test database.

    $ NODE_ENV=test yarn migrate
    $ yarn test

Run tests with coverage.

    $ yarn test:coverage

## Why 8848?

Because the highest point in the world is [8848 metres](https://en.wikipedia.org/wiki/Mount_Everest).

## Contributing

Read our [contributing guide](../CONTRIBUTING.md) to learn about our development process, how to propose bugs and improvements.

## Change Log

Check the [CHANGELOG](../CHANGELOG.md) for full release history.

## License

Licensed under [The MIT License](LICENSE).
