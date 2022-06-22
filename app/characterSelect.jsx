import React, { useState, useEffect } from "react";
import Character from "./components/character";
import fs from "fs";
const { ipcRenderer } = window.require('electron');

const CharacterSelect = ({ selectFunction, basePathSelectFunction, basePath }) => {
  const [characters, initialiseCharacterList] = useState([]);

  function charactersAvailable() {
    const characterRegex = new RegExp(/^(.*)_00.log$/);
    const charactersInDirectory = [];

    return new Promise((resolve, reject) => {
      fs.readdir(basePath, (err, files) => {
        if (err) return reject(err);

        files.forEach(file => {
          const matches = file.match(characterRegex);
          if (matches && matches.length > 0) charactersInDirectory.push({
            name: matches[1],
            path: `$basePath\\$file`
          });
        });
        return resolve(charactersInDirectory);
      });
    });
  }

  useEffect(() => {
    if (basePath) charactersAvailable().then(data => initialiseCharacterList(data))
  })

  async function browseForLogsDirectory() {
    const result = await ipcRenderer.invoke('selectDirectory');
    if (!result || result.canceled) return;
    basePathSelectFunction(result.filePaths[0]);
  }

  function getPathSelection() {
    if (basePath) {
      return (
        <select id="character-select" onChange={selectFunction}>
          {characters.map(character => <Character key={character.name} name={character.name} />)}
        </select>)
    }
    return (<p>Please select your game log directory <button onClick={browseForLogsDirectory
    } >Browse</button></p>)
  }

  return (
    <div key="character-select-content">
      <h1>Welcome to Neoscan</h1>
      <p>This tool will actively scan your character damage logs and render the damage you recieve as you recieve it</p>
      <p>Note: You must enable logging by adding <span className="code">ENABLELOG = "TRUE"</span> to your neocron.ini file.
        This file can be found in your neocron game install directory.</p>
      <p>Please select the the character you would like to monitor:</p>
      {getPathSelection()}
    </div>
  );
}

export default CharacterSelect;