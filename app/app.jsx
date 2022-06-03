import React, { useEffect, useState } from "react";
import CharacterSelect from "./characterSelect";
import HitResults from "./hitResults";

const App = () => {
    let [selectedCharacter, selectCharacter] = useState();
    const logPath = "C:\\Games\\Neocron Evolution 2.5\\logs"
    const envLogPath = process.env.NEOSCAN_LOG_PATH
    const basePath = envLogPath || logPath;

    function characterSelected(event) {
        selectedCharacter = event.target.value;
        selectCharacter(selectedCharacter);
    }

    if (selectedCharacter) return <HitResults characterName={selectedCharacter} basePath={basePath
    } />
    return <CharacterSelect selectFunction={characterSelected} basePath={basePath
    } />
}

export default App;