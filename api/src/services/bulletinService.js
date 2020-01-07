import Boom from 'boom';
import Bulletin from '../models/bulletin';
import Bookshelf from '../db';

/**
 * Get all bulletins.
 *
 * @returns {Promise}
 */
export function getAllBulletins() {
  return Bulletin.fetchAll();
}

/**
 * Get a bulletin.
 *
 * @param  {Number|String}  id
 * @returns {Promise}
 */
export function getBulletin(id) {
  return new Bulletin({ id }).fetch().then(bulletin => {
    if (!bulletin) {
      throw new Boom.notFound('Bulletin not found');
    }

    return bulletin;
  });
}

/**
 * Create new bulletin.
 *
 * @param  {Object} bulletin
 * @returns {Promise}
 */
export async function createBulletin(bulletin) {
  const model = await getMaxPriorityValue();
  const newPriority = model.get('priority') + 1;

  return new Bulletin({
    title: bulletin.title,
    owner: bulletin.owner,
    priority: newPriority,
    duration: bulletin.duration,
    active_status: bulletin.activeStatus,
    url: bulletin.url
  })
    .save()
    .then(bulletin => bulletin.refresh());
}

/**
 * Update a bulletin.
 *
 * @param  {Number|String}  id
 * @param  {Object}         bulletin
 * @returns {Promise}
 */
export function updateBulletin(id, bulletin) {
  return new Bulletin({ id })
    .save({
      title: bulletin.title,
      owner: bulletin.owner,
      priority: bulletin.priority,
      duration: bulletin.duration,
      active_status: bulletin.activeStatus,
      url: bulletin.url
    })
    .then(bulletin => bulletin.refresh());
}

/**
 * Bulk update bulletins.
 *
 * @param  {Array}         bulletins
 * @returns {Object}
 */
export async function updateBulletins(bulletins) {
  const knex = Bookshelf.knex;

  await knex.transaction(trx => {
    const queries = [];

    bulletins.map(bulletin => {
      const query = knex('bulletins')
        .where('id', bulletin.id)
        .update({
          title: bulletin.title,
          owner: bulletin.owner,
          priority: bulletin.priority,
          duration: bulletin.duration,
          active_status: bulletin.activeStatus,
          url: bulletin.url
        })
        .transacting(trx);

      queries.push(query);
    });

    Promise.all(queries)
      .then(trx.commit)
      .catch(trx.rollback);
  });

  return { status: true };
}

/**
 * Delete a bulletin.
 *
 * @param  {Number|String}  id
 * @returns {Promise}
 */
export function deleteBulletin(id) {
  return new Bulletin({ id }).fetch().then(bulletin => bulletin.destroy());
}

/**
 * Get Max Priority Value.
 *
 * @returns
 */
function getMaxPriorityValue() {
  return Bulletin.query('max', 'priority').fetch({ columns: ['priority'] });
}
