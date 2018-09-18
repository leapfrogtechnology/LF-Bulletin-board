import socketio from 'socket.io';

let io = null;

export function getIO() {
  return io;
}

export function initialize(server) {
  io = socketio(server);
}
