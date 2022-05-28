var express = require('express');
const fs = require('fs');

function createRouter(basePath) {
  var router = express.Router();
  const logPath = "C:\\Games\\Neocron Evolution 2.5\\logs"
  const envLogPath = process.env.NEOSCAN_LOG_PATH
  basePath = basePath || envLogPath || logPath;

  function charactersAvailable() {
    const characterRegex = new RegExp(/^(.*)_00.log$/);
    const characters = [];

    return new Promise((resolve, reject) => {
      fs.readdir(basePath, (err, files) => {
        if(err) return reject(err);
        
        files.forEach(file => {
          console.log(file)
          const matches = file.match(characterRegex);
          console.log(matches);
          if(matches && matches.length > 0) characters.push({
            name: matches[1],
            path: `$basePath\\$file`
          });
        });
        console.log(characters);
        return resolve(characters);
      });
    });
  }
  
  router.get('/', function (req, res) {
    charactersAvailable().then(characters => res.render('index', { characters: characters }))
  });

  return router;
}


module.exports = createRouter;