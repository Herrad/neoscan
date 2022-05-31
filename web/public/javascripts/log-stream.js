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
const container = document.querySelector('#log-container');
const root = ReactDOM.createRoot(container);

const HitTable = ({
  hitData
}) => {
  const dataToRender = hitData.map(damageType => {
    return /*#__PURE__*/React.createElement(DamageType, {
      damageEntry: damageType,
      key: damageType.description
    });
  });
  if (!dataToRender.length) return;
  return /*#__PURE__*/React.createElement("div", {
    className: "hit"
  }, /*#__PURE__*/React.createElement("h2", null, "Hit Registered!"), /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Damage Taken"), /*#__PURE__*/React.createElement("th", null, "Maximum Damage"), /*#__PURE__*/React.createElement("th", null, "Reduced By"), /*#__PURE__*/React.createElement("th", null, "Type"), /*#__PURE__*/React.createElement("th", {
    className: "resistance"
  }, "Resistance Breakdown"))), /*#__PURE__*/React.createElement("tbody", null, dataToRender)));
};

const DamageType = ({
  damageEntry
}) => {
  const resistancesToRender = damageEntry.reductions.map(reduction => {
    return /*#__PURE__*/React.createElement(Resistance, {
      reduction: reduction,
      totalReducedDamage: damageEntry.reducedDamage,
      key: reduction.source
    });
  });
  return /*#__PURE__*/React.createElement("tr", {
    className: damageEntry.description
  }, /*#__PURE__*/React.createElement("td", null, damageEntry.totalDamageAfterReduction.toFixed(2)), /*#__PURE__*/React.createElement("td", null, damageEntry.baseDamageAmount.toFixed(2)), /*#__PURE__*/React.createElement("td", null, damageEntry.reducedDamage.toFixed(2)), /*#__PURE__*/React.createElement("td", null, damageEntry.description), /*#__PURE__*/React.createElement("td", {
    className: "resistance"
  }, resistancesToRender));
};

const Resistance = ({
  reduction,
  totalReducedDamage
}) => /*#__PURE__*/React.createElement("span", {
  className: "resistance"
}, reduction.source, " ", reduction.reducedDamageBy.toFixed(2), " (", (reduction.reducedDamageBy / totalReducedDamage * 100).toFixed(0), "%)");

function prependLogData(logs) {
  logData.push(logs);
  root.render(logData.reverse().map(hit => /*#__PURE__*/React.createElement(HitTable, {
    hitData: hit
  })));
}

function routeMessage(event) {
  console.log('messageReceived');
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
  const socket = new WebSocket('ws://localhost:3001');
  socket.onmessage = routeMessage;
};