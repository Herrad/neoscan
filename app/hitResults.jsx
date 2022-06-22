import React, { useEffect, useState } from "react";
import HitTable from "./components/hitTable";
const createFileWatcher = require('../analyse/simulation');

const HitResults = ({ characterName, basePath, resetCharacterSelected }) => {
  const [hitHistory, setHitHistory] = useState([]);
  let buffer = [];

  const handleNewLogs = (logs) => {
    buffer = [logs, ...buffer, ...hitHistory];

    setHitHistory(buffer);
  };

  useEffect(() => {
    const fileWatcher = createFileWatcher({
      render: logs => {
        if (!logs.length) return;
        handleNewLogs(logs)
      }
    });
    if (characterName) fileWatcher.scan({}, characterName, basePath)
  }, []);

  const hitsToRender = hitHistory.map((hitData, i) => {
    return <HitTable hitData={hitData} key={`hit-${i}`} />
  });

  return (<div id="hit-content">
    <a onClick={resetCharacterSelected}>Return to Character Selection</a>
    {hitsToRender}
  </div>);
}

export default HitResults;