# bulletin-board

[![Code Climate](https://img.shields.io/codeclimate/github/kabisaict/flow.svg?style=flat-square)](https://codeclimate.com/github/leapfrogtechnology/bulletin-board)
[![Build Status](https://img.shields.io/travis/leapfrogtechnology/bulletin-board.svg?style=flat-square)](https://travis-ci.org/leapfrogtechnology/bulletin-board)
[![Codecov](https://img.shields.io/codecov/c/github/leapfrogtechnology/bulletin-board.svg?style=flat-square)](https://codecov.io/github/leapfrogtechnology/bulletin-board?branch=master)

Leapfrog Bulletin Board is a kiosk web application powered by Raspberry Pi.

## Setup
Clone this repository.

```bash
# Clone with SSH
$ git clone git@github.com:leapfrogtechnology/bulletin-board.git

# Or with HTTPS
$ git clone https://github.com/leapfrogtechnology/bulletin-board.git
```

Install dependencies on both `api` and `app`
For api
```bash
# Using npm
$ cd api
$ npm install

# Or using yarn
$ cd api
$ yarn
```

For app
```bash
# Using npm
$ cd app
$ npm install

# Or using yarn
$ cd app
$ yarn
```

Create a local environment file `.env` using the sample file on both `app` & `api`.
```bash
$ cd app
$ cp .env.example .env
```

```bash
$ cd api
$ cp .env.example .env
```
On the `api` folder adjust the following information on the `.env`
```
# Application
APP_PORT=8000
APP_HOST=127.0.0.1

# Environment
NODE_ENV=development

# Database
DB_CLIENT=sqlite
DB_FILE=<database_filename>(eg:bulletin_board.db)
DB_NAME=<database_name>(eg:bulletindb)

# Test Environment
TEST_DB_NAME=<test_databasae_name>
```
On the `api` folder adjust the following information on the `.env`
```
#url
REACT_APP_BASE_HREF="http://localhost:8848"
REACT_APP_BASE_API_URL="http://localhost:8848/api"
REACT_APP_GOOGLE_LOGIN_URL="http://localhost:8848/api/auth/google"

```

Add required user  `email`
```
$ cd api/src/seeds/
```

Create a `db` file on the `api`.
```
$ cd bulletin-board/api/src/db/
$ touch bulletin-board.db
```

Run migrations on the `api`
```
$ cd api
$ yarn migrate
```

Run seed on the `api`
```
$ yarn seed
```
Start the `api`
```
$ yarn start:dev
```

Then start the `app`
```
$ yarn start
```

## Contributing

Read our [contributing guide](CONTRIBUTING.md) to learn about our development process, how to propose bugs and improvements.

## License

Bulletin-Board is licensed under the [MIT License](LICENSE.md).
