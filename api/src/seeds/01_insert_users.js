/**
 * Seed users table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('users')
    .del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert([
          {
            email: 'basantamaharjan@lftechnology.com'
          },
          {
            email: 'ayushghimire@lftechnology.com'
          },
          {
            email: 'aanchaladhikari@lftechnology.com'
          },
          {
            email: 'pravashupreti@lftechnology.com'
          },
          {
            email: 'aishwaryapradhan@lftechnology.com'
          },
          {
            email: 'ypradhan@lftechnology.com'
          },
          {
            email: 'yankeemaharjan@lftechnology.com'
          },
          {
            email: 'sarojshahi@lftechnology.com'
          }
        ])
      ]);
    });
}
