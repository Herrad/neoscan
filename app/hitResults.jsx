import React, { useEffect, useState } from "react";
import HitTable from "./components/hitTable";
const createFileWatcher = require('../analyse/scan');

const HitResults = ({ characterName, basePath }) => {
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
    console.log(basePath, characterName)
    if (characterName) fileWatcher.scan({}, characterName, basePath)
  }, []);

  const hitsToRender = hitHistory.map((hitData, i) => {
    return <HitTable hitData={hitData} key={`hit-${i}`} />
  });

  return hitsToRender;
}

export default HitResults;