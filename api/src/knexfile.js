const path = require('path');

require('babel-register');
require('dotenv').config({ path: __dirname + '/../.env' });
console.log(path.join(__dirname, '/db', process.env.DB_FILE)); // eslint-disable-line no-console

/**
 * Database configuration.
 */
module.exports = {
  client: process.env.DB_CLIENT,
  connection: {
    filename: path.join(__dirname, '/db', process.env.DB_FILE),
    database: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_NAME : process.env.DB_NAME,
    charset: 'utf8',
    timezone: 'UTC'
  },
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
