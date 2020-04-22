const path = require('path');

require('babel-register');
require('dotenv').config({ path: __dirname + '/../.env' });

let connection = {};

if (process.env.DB_CLIENT === 'sqlite') {
  console.log(path.join(__dirname, process.env.DB_FILE)); // eslint-disable-line no-console
  connection = {
    charset: 'utf8',
    timezone: 'UTC',
    filename: path.join(__dirname, process.env.DB_FILE),
    database: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_NAME : process.env.DB_NAME
  };
} else {
  if (process.env.NODE_ENV === 'test') {
    connection = {
      charset: 'utf8',
      timezone: 'UTC',
      port: process.env.TEST_DB_PORT,
      host: process.env.TEST_DB_HOST,
      user: process.env.TEST_DB_USER,
      password: process.env.TEST_DB_PASSWORD,
      database: process.env.TEST_DB_NAME
    };
  } else {
    connection = {
      charset: 'utf8',
      timezone: 'UTC',
      port: process.env.DB_PORT,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    };
  }
}

/**
 * Database configuration.
 */
module.exports = {
  client: process.env.DB_CLIENT,
  connection: connection,
  useNullAsDefault: true,
  migrations: {
    tableName: 'migrations',
    directory: './migrations',
    stub: './stubs/migration.stub'
  },
  seeds: {
    directory: './seeds',
    stub: './stubs/seed.stub'
  }
};
