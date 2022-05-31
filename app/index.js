import React from 'react';
import App from './app';

let logData = [];

function prependLogData(logs) {
  logData.push(logs);
}

function routeMessage(event) {
  console.log('messageReceived')
  const message = JSON.parse(event.data);
  switch (message.type) {
    case 'healthy':
      break;
    case 'log-data':
      prependLogData(message.logs);
  }
}

window.onload = function () {
  const socket = new WebSocket('ws://localhost:3001')
  socket.onmessage = routeMessage
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);