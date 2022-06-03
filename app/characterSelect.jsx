import React, { useState, useEffect } from "react";
import Character from "./components/character";
import fs from "fs";

const CharacterSelect = ({ selectFunction, basePath }) => {
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
    charactersAvailable().then(data => initialiseCharacterList(data))
  }, [])

  return (
    <div key="character-select-content">
      <h1>Welcome to Neoscan</h1>
      <p>This tool will actively scan your character damage logs and render the damage you recieve as you recieve it</p>
      <p>Note: You must enable logging by adding <span className="code">ENABLELOG = "TRUE"</span> to your neocron.ini file.
        This file can be found in your neocron game install directory.</p>
      <p>Please select the the character you would like to monitor:</p>
      <select id="character-select" onChange={selectFunction}>
        {characters.map(character => <Character key={character.name} name={character.name} />)}
      </select>
    </div>
  );
}

export default CharacterSelect;