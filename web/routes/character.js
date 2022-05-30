var express = require('express');

function createRouter(basePath, socketServer) {
  var router = express.Router();
  const logPath = "C:\\Games\\Neocron Evolution 2.5\\logs"
  const envLogPath = process.env.NEOSCAN_LOG_PATH
  basePath = basePath || envLogPath || logPath;

  function loadCharacterFile(characterName) {
      return new Promise((resolve) => resolve());
  }
  
  router.get('/', (req, res) => res.redirect('/'));
  router.get('/:characterName', (req, res) => loadCharacterFile(req.params.characterName).then(() => res.render('character')));

  return router;
}


module.exports = createRouter;