import React, { useEffect, useState } from "react";
import CharacterSelect from "./characterSelect";
import HitResults from "./hitResults";

const App = () => {
    let [selectedCharacter, selectCharacter] = useState();
    let [basePath, selectBasePath] = useState();

    function setBasePath(path) {
        basePath = path;
        selectBasePath(basePath);
    }

    function characterSelected(event) {
        selectedCharacter = event.target.value;
        selectCharacter(selectedCharacter);
    }

    if (selectedCharacter && basePath) return <HitResults characterName={selectedCharacter} basePath={basePath
    } />
    return <CharacterSelect selectFunction={characterSelected} basePathSelectFunction={setBasePath
    } basePath={basePath} />
}

export default App;