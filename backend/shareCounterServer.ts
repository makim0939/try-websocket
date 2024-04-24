import WebSocket, { Server } from 'ws';

let count = 0;
export const sendCount = (server: Server, ws: WebSocket) => {
  count++;
  server.clients.forEach((client) => {
    if (client.readyState === ws.OPEN) {
      client.send('count' + count);
    }
  });
};
