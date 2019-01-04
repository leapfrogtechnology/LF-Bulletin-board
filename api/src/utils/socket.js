import socketio from 'socket.io';

let io = null;

export function getIO() {
  return io;
}

export function emitUpdate() {
  io.emit('IS_LIST_UPDATED', { status: true });
}

export function initialize(server) {
  io = socketio(server);
}
