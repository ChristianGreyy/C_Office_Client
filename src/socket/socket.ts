
import { io } from 'socket.io-client';

export const initSocketConnection = (namespace: string, token?: string) => {
  console.log(`http://localhost:8080/${namespace}`)
  const socket = io(`http://localhost:8080/${namespace}`, {
    // autoConnect: false,
    transports: ['websocket'],
    auth: {
      authorization: `Bearer ${token}`
    },
  });

  socket.on('connect', () => {
    console.log('socket connected ' + namespace);
  });
  socket.on('connect_error', () => {
    console.log('socket connect error ' + namespace);
  });
  socket.on('disconnect', () => {
    console.log('socket disconnected ' + namespace);
  });

  return socket;
};
