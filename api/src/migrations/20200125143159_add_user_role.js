import { userRoles } from '../const';

/**
 * @param  {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.table('users', (table) => {
    table.unique('email');
    table.string('role').defaultTo(userRoles.admin);
    table.string('created_at').nullable().defaultTo(null);
    table.string('updated_at').nullable().defaultTo(null);
  });
}

/**
 * @param  {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.table('users', (table) => {
    table.dropColumn('role');
    table.dropColumn('created_at');
    table.dropColumn('updated_at');
  });
}
