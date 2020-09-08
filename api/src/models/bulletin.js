import bookshelf from '../db';

const TABLE_NAME = 'bulletins';

/**
 * Bulletin model.
 *
 * @augments {bookshelf.Model}
 */
class Bulletin extends bookshelf.Model {
  /**
   * Get Table Name.
   *
   * @readonly
   * @memberof Bulletin
   */
  get tableName() {
    return TABLE_NAME;
  }

  /**
   * Check Timestamps.
   *
   * @readonly
   * @memberof Bulletin
   */
  get hasTimestamps() {
    return true;
  }
}

export default Bulletin;
