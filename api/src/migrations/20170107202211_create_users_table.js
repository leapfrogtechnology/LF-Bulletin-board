/**
 * Create users table.
 *
 * @param  {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('email').notNull();
  });
}

/**
 * Drop users table.
 *
 * @param  {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('users');
}
