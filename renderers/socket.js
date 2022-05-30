const ws = require('ws')

function createWebSocket(port) {
  const activeClient = undefined;
  const wss = new ws.WebSocketServer({ port: port });
  wss.on('connection', ws => {
    ws.send('connection established');
    activeClient = ws;
    ws.on('health', () => ws.send('healthy'));
  })

  return {
    render: (data) => {
      if(activeClient) activeClient.send(data);
    }
  };
}

module.exports = createWebSocket;