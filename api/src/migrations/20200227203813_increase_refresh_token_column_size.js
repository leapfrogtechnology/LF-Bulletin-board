/**
 * @param  {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.table('sessions', table => {
    table.string('refresh_token', 1000).alter();
  });
}

/**
 * @param  {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.table('sessions', table => {
    table.string('refresh_token').alter();
  });
}
