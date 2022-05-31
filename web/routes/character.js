var express = require('express');
var createLiveScanner = require('../../analyse/liveScan');
const createScanner = require('../../analyse/scan');

function createRouter(path, socketServer) {
  var router = express.Router();

  router.get('/', (req, res) => res.redirect('/'));
  router.get('/:characterName', (req, res) => {
    createLiveScanner(socketServer).scan({}, req.params.characterName, path);
    res.render('character')
  });
  router.get('/:characterName/scan', (req, res) => {
    createScanner(socketServer).scan({}, req.params.characterName, path);
    setTimeout(() => res.json(data), 500);
  })

  return router;
}


module.exports = createRouter;