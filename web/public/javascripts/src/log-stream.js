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
const container = document.querySelector('#log-container')
const root = ReactDOM.createRoot(container);

const HitTable = ({ hitData }) => {
  const dataToRender = hitData.map(damageType => {
    return <DamageType damageEntry={damageType} key={damageType.description} />
  })

  if (!dataToRender.length) return;

  return (
    <div className="hit">
      <h2>Hit Registered!</h2>
      <table>
        <thead>
          <tr>
            <th>Damage Taken</th>
            <th>Maximum Damage</th>
            <th>Reduced By</th>
            <th>Type</th>
            <th className="resistance">Resistance Breakdown</th>
          </tr>
        </thead>
        <tbody>
          {dataToRender}
        </tbody>
      </table>
    </div>
  );
}

const DamageType = ({ damageEntry }) => {

  const resistancesToRender = damageEntry.reductions.map(reduction => {
    return <Resistance reduction={reduction} totalReducedDamage={damageEntry.reducedDamage} key={reduction.source} />
  })

  return (<tr className={damageEntry.description}>
    <td>{damageEntry.totalDamageAfterReduction.toFixed(2)}</td>
    <td>{damageEntry.baseDamageAmount.toFixed(2)}</td>
    <td>{damageEntry.reducedDamage.toFixed(2)}</td>
    <td>{damageEntry.description}</td>
    <td className="resistance">{resistancesToRender}</td>
  </tr>)
}

const Resistance = ({ reduction, totalReducedDamage }) => <span className="resistance">
  {reduction.source} {reduction.reducedDamageBy.toFixed(2)} ({(reduction.reducedDamageBy / totalReducedDamage * 100).toFixed(0)}%)
</span>

function prependLogData(logs) {
  logData.push(logs);

  root.render(logData.reverse().map(hit => <HitTable hitData={hit} />))
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

function scan() {
  $.get(`${document.URL}/scan`);
}

window.onload = function () {
  const socket = new WebSocket('ws://localhost:3001')
  socket.onmessage = routeMessage
}