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

var HitTable = function HitTable(_ref) {
  var hitData = _ref.hitData;

  var dataToRender = logData.map(function (damageType) {
    return React.createElement(DamageType, { damageEntry: damageType, key: damageType.description });
  });

  return React.createElement(
    'table',
    { className: 'hit' },
    React.createElement(
      'thead',
      null,
      React.createElement(
        'tr',
        null,
        React.createElement(
          'th',
          null,
          'Damage Taken'
        ),
        React.createElement(
          'th',
          null,
          'Maximum Damage'
        ),
        React.createElement(
          'th',
          null,
          'Reduced By'
        ),
        React.createElement(
          'th',
          null,
          'Type'
        ),
        React.createElement(
          'th',
          null,
          'Resistance Breakdown'
        )
      )
    ),
    React.createElement(
      'tbody',
      null,
      dataToRender
    )
  );
};

var DamageType = function DamageType(_ref2) {
  var damageEntry = _ref2.damageEntry;
  return React.createElement(
    'tr',
    null,
    React.createElement(
      'td',
      null,
      damageEntry.totalDamageAfterReduction.toFixed(2)
    ),
    React.createElement(
      'td',
      null,
      damageEntry.baseDamageAmount.toFixed(2)
    ),
    React.createElement(
      'td',
      null,
      damageEntry.reducedDamage.toFixed(2)
    ),
    React.createElement(
      'td',
      null,
      damageEntry.description
    ),
    React.createElement(
      'td',
      null,
      damageEntry.reductions.map(function (reduction) {
        return reduction.source + ' ' + reduction.reducedDamageBy.toFixed(2) + ' (' + (reduction.reducedDamageBy / damageEntry.reducedDamage * 100).toFixed(0) + '%)';
      }).join(' ')
    )
  );
};

function prependLogData(logs) {
  logData = logs.reduce(function (overall, hit) {
    overall.push(hit);
    return overall;
  }, logData).reverse().slice(0, 20);
  var container = document.querySelector('#log-container');
  var root = ReactDOM.createRoot(container);

  root.render(logData.map(function (hit) {
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