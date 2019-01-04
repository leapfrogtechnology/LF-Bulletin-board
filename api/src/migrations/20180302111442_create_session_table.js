/**
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('sessions', table => {
    table.increments();
    table.timestamps();
    table.string('username').notNull();
    table.integer('user_id').notNull();
    table.string('refresh_token').notNull();
  });
}

/**
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('sessions');
}
