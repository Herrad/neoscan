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

var logData = [];
var e = React.createElement;
var container = document.querySelector('#log-container');
var root = ReactDOM.createRoot(container);

var HitTable = function HitTable(_ref) {
  var hitData = _ref.hitData;

  var dataToRender = hitData.map(function (damageType) {
    return React.createElement(DamageType, { damageEntry: damageType, key: damageType.description });
  });

  if (!dataToRender.length) return;

  return React.createElement(
    "div",
    { className: "hit" },
    React.createElement(
      "h2",
      null,
      "Hit Registered!"
    ),
    React.createElement(
      "table",
      null,
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement(
            "th",
            null,
            "Damage Taken"
          ),
          React.createElement(
            "th",
            null,
            "Maximum Damage"
          ),
          React.createElement(
            "th",
            null,
            "Reduced By"
          ),
          React.createElement(
            "th",
            null,
            "Type"
          ),
          React.createElement(
            "th",
            { className: "resistance" },
            "Resistance Breakdown"
          )
        )
      ),
      React.createElement(
        "tbody",
        null,
        dataToRender
      )
    )
  );
};

var DamageType = function DamageType(_ref2) {
  var damageEntry = _ref2.damageEntry;


  var resistancesToRender = damageEntry.reductions.map(function (reduction) {
    return React.createElement(Resistance, { reduction: reduction, totalReducedDamage: damageEntry.reducedDamage, key: reduction.source });
  });

  return React.createElement(
    "tr",
    { className: damageEntry.description },
    React.createElement(
      "td",
      null,
      damageEntry.totalDamageAfterReduction.toFixed(2)
    ),
    React.createElement(
      "td",
      null,
      damageEntry.baseDamageAmount.toFixed(2)
    ),
    React.createElement(
      "td",
      null,
      damageEntry.reducedDamage.toFixed(2)
    ),
    React.createElement(
      "td",
      null,
      damageEntry.description
    ),
    React.createElement(
      "td",
      { className: "resistance" },
      resistancesToRender
    )
  );
};

var Resistance = function Resistance(_ref3) {
  var reduction = _ref3.reduction,
      totalReducedDamage = _ref3.totalReducedDamage;
  return React.createElement(
    "span",
    { className: "resistance" },
    reduction.source,
    " ",
    reduction.reducedDamageBy.toFixed(2),
    " (",
    (reduction.reducedDamageBy / totalReducedDamage * 100).toFixed(0),
    "%)"
  );
};

function prependLogData(logs) {
  logData.push(logs);

  root.render(logData.reverse().map(function (hit) {
    return React.createElement(HitTable, { hitData: hit });
  }));
}

function routeMessage(event) {
  console.log('messageReceived');
  var message = JSON.parse(event.data);
  switch (message.type) {
    case 'healthy':
      break;
    case 'log-data':
      prependLogData(message.logs);
  }
}

window.onload = function () {
  var socket = new WebSocket('ws://localhost:3001');
  socket.onmessage = routeMessage;
};