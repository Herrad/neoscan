var express = require('express');
const path = require('path');

function createRouter() {
  var router = express.Router();

  router.get('/', (req, res) => res.sendFile(path.resolve(`${__dirname}/../views/index.html`)));

  return router;
}


module.exports = createRouter;