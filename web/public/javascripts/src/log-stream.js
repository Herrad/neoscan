// 'use strict';

// const e = React.createElement;

// class LikeButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { liked: false };
//   }

//   render() {
//     if (this.state.liked) {
//       return 'You liked this.';
//     }

//     return e(
//       'button',
//       { onClick: () => this.setState({ liked: true }) },
//       'Like'
//     );
//   }
// }

// const domContainer = document.querySelector('#like_button_container');
// const root = ReactDOM.createRoot(domContainer);
// root.render(e(LikeButton));

let logData = [];
const e = React.createElement;

const HitTable = ({ hitData }) => {
  const dataToRender = logData.map(damageType => {
    return <DamageType damageEntry={damageType} key={damageType.description} />
  })

  return (
    <table className="hit">
      <thead>
        <tr>
          <th>Damage Taken</th>
          <th>Maximum Damage</th>
          <th>Reduced By</th>
          <th>Type</th>
          <th>Resistance Breakdown</th>
        </tr>
      </thead>
      <tbody>
        {dataToRender}
      </tbody>
    </table>
  );
}

const DamageType = ({ damageEntry }) => <tr>
  <td>{damageEntry.totalDamageAfterReduction.toFixed(2)}</td>
  <td>{damageEntry.baseDamageAmount.toFixed(2)}</td>
  <td>{damageEntry.reducedDamage.toFixed(2)}</td>
  <td>{damageEntry.description}</td>
  <td>{damageEntry.reductions.map(reduction => {
    return `${reduction.source} ${reduction.reducedDamageBy.toFixed(2)} (${(reduction.reducedDamageBy / damageEntry.reducedDamage * 100).toFixed(0)}%)`;
  }).join(' ')}</td>
</tr>

function prependLogData(logs) {
  logData = logs.reduce((overall, hit) => {
    overall.push(hit);
    return overall;
  }, logData).reverse().slice(0, 20);
  const container = document.querySelector('#log-container')
  const root = ReactDOM.createRoot(container);

  root.render(logData.map(hit => <HitTable hitData={hit} />))
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