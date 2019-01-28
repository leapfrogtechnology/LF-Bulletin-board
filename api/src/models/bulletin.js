import bookshelf from '../db';

const TABLE_NAME = 'bulletins';

/**
 * Bulletin model.
 */
class Bulletin extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }
}

export default Bulletin;
