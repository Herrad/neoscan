const fs = require('fs')

window.onload = function () {
  const logPath = "C:\\Games\\Neocron Evolution 2.5\\logs"
  const envLogPath = process.env.NEOSCAN_LOG_PATH
  basePath = envLogPath || logPath;

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


  charactersAvailable().then(data => {
    const characterElement = $('#character-list');
    data.map(character => characterElement.append(`<li><a href="/character/${character.name}">${character.name}</a></li>`));
  });
}