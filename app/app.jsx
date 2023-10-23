import React, { useEffect, useState } from "react";
import CharacterSelect from "./characterSelect";
import HitResults from "./hitResults";
import DPSCounter from "./dpsCounter";
const { ipcRenderer } = window.require('electron');

const App = () => {
    let [selectedCharacter, selectCharacter] = useState();
    let [basePath, selectBasePath] = useState();

    function setBasePath(path) {
        basePath = path;
        selectBasePath(basePath);
    }

    function characterSelected(event) {
        if (!event) {
            selectedCharacter = undefined;
            selectCharacter(undefined);
            return;
        }
        selectedCharacter = event.target.value;
        selectCharacter(selectedCharacter);
    }

    useEffect(() => {
        async function getConfiguredBasePath() {
            const configuredBasePath = await ipcRenderer.invoke('getStoreValue', 'basePath');
            console.log('Configured Base Path:', configuredBasePath);
            setBasePath(configuredBasePath);
        }
        getConfiguredBasePath();
    }, [])

    if (selectedCharacter && basePath)
        return (<div>
            <HitResults characterName={selectedCharacter} basePath={basePath} resetCharacterSelected={() => characterSelected()} />
            <DPSCounter characterName={selectedCharacter} />
        </div>)

    return <CharacterSelect selectFunction={characterSelected} basePathSelectFunction={setBasePath} basePath={basePath} />
}

export default App;