import bookshelf from '../db';

const TABLE_NAME = 'sessions';

/**
 * Session model
 *
 * @extends {bookshelf.Model}
 */
class Session extends bookshelf.Model {
  /**
   * Get Table Name.
   *
   * @readonly
   * @memberof Session
   */
  get tableName() {
    return TABLE_NAME;
  }

  /**
   * Check Timestamps.
   *
   * @readonly
   * @memberof Session
   */
  get hasTimestamps() {
    return true;
  }
}

export default Session;
