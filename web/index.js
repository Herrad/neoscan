

const createError = require('http-errors');
const express = require('express');
const http = require('http');
const debug = require('debug')('server:server');
const path = require('path');
const logger = require('morgan');
const open = require('open');
require('hbs')

function createServer(basePath) {
  const socketPort = normalizePort(3001);
  const socketServer = require('../renderers/socket')(socketPort);

  var indexRouter = require('./routes/index')(basePath);
  var characterRouter = require('./routes/character')(basePath, socketServer)

  var app = express();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'hbs');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', indexRouter);
  app.use('/character', characterRouter);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  return {
    launch: () => {
      const port = normalizePort(3000);
      app.set('port', port);

      var server = http.createServer(app);

      server.listen(port);
      server.on('error', onError);
      server.on('listening', onListening);

      /**
       * Event listener for HTTP server "error" event.
       */

      function onError(error) {
        if (error.syscall !== 'listen') {
          throw error;
        }

        var bind = typeof port === 'string'
          ? 'Pipe ' + port
          : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
          case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
          case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
          default:
            throw error;
        }
      }

      /**
       * Event listener for HTTP server "listening" event.
       */

      function onListening() {
        var addr = server.address();
        var bind = typeof addr === 'string'
          ? 'pipe ' + addr
          : 'port ' + addr.port;
        debug('Listening on ' + bind);
      }


      open(`http://localhost:3000?path=${basePath || process.env.NEOSCAN_LOG_PATH}`);
    }
  }
}

module.exports = createServer;