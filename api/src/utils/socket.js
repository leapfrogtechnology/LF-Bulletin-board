import socketio from 'socket.io';

let io = null;

/**
 * Get IO Object.
 *
 * @returns
 */
export function getIO() {
  return io;
}

/**
 * Emit Update.
 *
 */
export function emitUpdate() {
  io.emit('IS_LIST_UPDATED', { status: true });
}

/**
 * Initialize Socket IO.
 *
 * @param {*} server
 */
export function initialize(server) {
  io = socketio.listen(server);
}
