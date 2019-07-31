import Boom from 'boom';
import Bulletin from '../models/bulletin';
import Bookshelf from '../db';

/**
 * Get all bulletins.
 *
 * @return {Promise}
 */
export function getAllBulletins() {
  return Bulletin.fetchAll();
}

/**
 * Get a bulletin.
 *
 * @param  {Number|String}  id
 * @return {Promise}
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
 * @return {Promise}
 */
export async function createBulletin(bulletin) {
  let model = await getMaxPriorityValue();
  let newPriority = model.get('priority') + 1;

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
 * @return {Promise}
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
 * @return {Object}
 */
export async function updateBulletins(bulletins) {
  let knex = Bookshelf.knex;

  await knex.transaction(trx => {
    let queries = [];

    bulletins.map(bulletin => {
      let query = knex('bulletins')
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
 * @return {Promise}
 */
export function deleteBulletin(id) {
  return new Bulletin({ id }).fetch().then(bulletin => bulletin.destroy());
}

function getMaxPriorityValue() {
  return Bulletin.query('max', 'priority')
    .fetch({ columns: ['priority'] });
}
