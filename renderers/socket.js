const ws = require('ws')

function createWebSocket(port) {
  let activeClient = undefined;
  const wss = new ws.WebSocketServer({ port: port });
  wss.on('connection', ws => {
    console.log('client connection established');
    activeClient = ws;
    ws.on('health', () => ws.send({ type: 'healthy' }));
  })

  let dataQueue = [];

  function pushData() {
    if (!activeClient) return setTimeout(pushData, 1000);
    console.log('sending data');
    dataQueue.map(data => activeClient.send(JSON.stringify({ type: 'log-data', logs: data })));
    dataQueue = [];
  }

  return {
    render: (data) => {
      if (activeClient) {
        return activeClient.send(JSON.stringify({ type: 'log-data', logs: data }));
      }
      dataQueue.push(data);
      setTimeout(pushData, 500)
    }
  };
}

module.exports = createWebSocket;