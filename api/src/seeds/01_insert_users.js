import { userRoles } from '../const';

/**
 * Seed users table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @returns {Promise}
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
            email: 'basantamaharjan@lftechnology.com',
            role: userRoles.superAdmin,
            created_at: Date.now(),
            updated_at: Date.now()
          },
          {
            email: 'biplapbhattarai@lftechnology.com',
            role: userRoles.superAdmin,
            created_at: Date.now(),
            updated_at: Date.now()
          },
          {
            email: 'aleshdulal@lftechnology.com',
            role: userRoles.superAdmin,
            created_at: Date.now(),
            updated_at: Date.now()
          },
          {
            email: 'aanchaladhikari@lftechnology.com',
            role: userRoles.superAdmin,
            created_at: Date.now(),
            updated_at: Date.now()
          },
          {
            email: 'ypradhan@lftechnology.com',
            role: userRoles.superAdmin,
            created_at: Date.now(),
            updated_at: Date.now()
          },
          {
            email: 'yankeemaharjan@lftechnology.com',
            role: userRoles.superAdmin,
            created_at: Date.now(),
            updated_at: Date.now()
          },
          {
            email: 'sarojshahi@lftechnology.com',
            role: userRoles.superAdmin,
            created_at: Date.now(),
            updated_at: Date.now()
          },
          {
            email: 'sparshadotel@lftechnology.com',
            role: userRoles.superAdmin,
            created_at: Date.now(),
            updated_at: Date.now()
          }
        ])
      ]);
    });
}
