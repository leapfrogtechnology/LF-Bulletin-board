import bookshelf from '../db';

const TABLE_NAME = 'users';

/**
 * User model.
 *
 * @augments {bookshelf.Model}
 */
class User extends bookshelf.Model {
  /**
   *  Get Table Name.
   *
   * @readonly
   * @memberof User
   */
  get tableName() {
    return TABLE_NAME;
  }

  /**
   *  Check Timestamps.
   *
   * @readonly
   * @memberof User
   */
  get hasTimestamps() {
    return true;
  }
}

export default User;
