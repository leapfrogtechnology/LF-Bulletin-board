import Boom from 'boom';
import Bulletin from '../models/bulletin';

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
export function createBulletin(bulletin) {
  return new Bulletin({
    title: bulletin.title,
    owner: bulletin.owner,
    priority: bulletin.priority,
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
 * Delete a bulletin.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteBulletin(id) {
  return new Bulletin({ id }).fetch().then(bulletin => bulletin.destroy());
}
