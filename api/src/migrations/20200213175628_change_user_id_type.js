/**
 * @param  {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.table('sessions', (table) => {
    table.string('user_id').alter();
  });
}

/**
 * @param  {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.table('sessions', (table) => {
    table.integer('user_id').alter();
  });
}
