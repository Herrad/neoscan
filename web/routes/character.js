var express = require('express');
var createLiveScanner = require('../../analyse/liveScan');

function createRouter(path, socketServer) {
  var router = express.Router();
  
  router.get('/', (req, res) => res.redirect('/'));
  router.get('/:characterName', (req, res) => {
    createLiveScanner(socketServer).watchLogFile({}, req.params.characterName, path);
    res.render('character')
  });

  return router;
}


module.exports = createRouter;