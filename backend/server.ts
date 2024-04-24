import WebSocket, { Server } from 'ws';
import { sendCount } from './shareCounterServer';

const server = new Server({ port: 3000 });

const assignClientId = (ws: WebSocket) => {
  const clientId = server.clients.size - 1;
  ws.send('id' + clientId);

  server.clients.forEach((client) => {
    if (client.readyState === ws.OPEN) {
      client.send('participantsNum' + server.clients.size);
    }
  });
};
const reAssignClientId = (ws: WebSocket) => {
  let i = 0;
  server.clients.forEach((client) => {
    if (client.readyState === ws.OPEN) {
      client.send('id' + i);
      client.send('participantsNum' + server.clients.size);
      i++;
    }
  });
};

server.on('connection', (ws, req) => {
  assignClientId(ws);

  ws.on('message', (message) => {
    console.log('Received: ' + message);
    if ('' + message === 'count') sendCount(server, ws);
  });
  ws.on('close', () => {
    reAssignClientId(ws);
    console.log('Closed.');
  });
});
