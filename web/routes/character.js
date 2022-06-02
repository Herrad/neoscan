var express = require('express');
const fs = require('fs');
const path = require('path');
var createLiveScanner = require('../../analyse/liveScan');
const createScanner = require('../../analyse/scan');

function createRouter(basePath, socketServer) {
  var router = express.Router();
  const logPath = "C:\\Games\\Neocron Evolution 2.5\\logs"
  const envLogPath = process.env.NEOSCAN_LOG_PATH
  basePath = basePath || envLogPath || logPath;

  function charactersAvailable() {
    const characterRegex = new RegExp(/^(.*)_00.log$/);
    const characters = [];

    return new Promise((resolve, reject) => {
      fs.readdir(basePath, (err, files) => {
        if (err) return reject(err);

        files.forEach(file => {
          const matches = file.match(characterRegex);
          if (matches && matches.length > 0) characters.push({
            name: matches[1],
            path: `$basePath\\$file`
          });
        });
        return resolve(characters);
      });
    });
  }

  router.get('/', (req, res) => res.redirect('/'));
  router.get('/list', (req, res) => charactersAvailable().then(characters => res.json(characters)))
  router.get('/:characterName', (req, res) => {
    createLiveScanner(socketServer).scan({}, req.params.characterName, basePath);
    res.sendFile(path.resolve(`${__dirname}/../views/character.html`))
  });
  router.get('/:characterName/scan', (req, res) => {
    createScanner(socketServer).scan({}, req.params.characterName, basePath);
    res.sendStatus(204)
  })

  return router;
}


module.exports = createRouter;