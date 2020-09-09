/**
 * Create bulletins table.
 *
 * @param  {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('bulletins', (table) => {
    table.increments();
    table.timestamps();
    table.string('title').notNull();
    table.string('owner');
    table.integer('priority');
    table.boolean('active_status').notNull();
    table.integer('duration').notNull();
    table.string('url').notNull();
  });
}

/**
 * Drop users table.
 *
 * @param  {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('bulletins');
}
