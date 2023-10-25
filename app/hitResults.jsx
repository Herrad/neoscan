import React, { useEffect, useState } from "react";
import HitTable from "./components/hitTable";
import FileWatcher from './analyse/watchers/liveScan';

const HitResults = ({ characterName, basePath, resetCharacterSelected }) => {
  const [hitHistory, setHitHistory] = useState([]);
  const [allowedDamageTypes, setAllowedDamageTypes] = useState({
    Healing: true,
    Force: true,
    Piercing: true,
    Fire: true,
    Poison: true,
    Energy: true,
    XRay: true
  });
  let buffer = [];

  const toggleDamageType = (event) => {
    allowedDamageTypes[event.target.name] = !allowedDamageTypes[event.target.name];
    setAllowedDamageTypes(allowedDamageTypes);
  }

  const handleNewLogs = (logs) => {
    buffer = [logs, ...buffer, ...hitHistory];

    setHitHistory(buffer);
  };

  useEffect(() => {
    const fileWatcher = new FileWatcher({
      render: logs => {
        if (!logs.length) return;
        handleNewLogs(logs)
      }
    });
    if (characterName) {
      fileWatcher.scan({}, characterName, basePath)
    }
  }, []);

  const hitsToRender = hitHistory.map((hitData, i) => {
    return <HitTable hitData={hitData} filterState={allowedDamageTypes} key={`hit-${i}`} />
  });

  return (<div id="hit-content">
    <a onClick={resetCharacterSelected}>Return to Character Selection</a>
    <h2 id="damage-filters-title">Include Damage Types</h2>
    <ul id="damage-filters">
      {Object.keys(allowedDamageTypes).map((damageType) => <li key={damageType}><label><input type="checkbox" name={damageType} onChange={toggleDamageType} defaultChecked="true"></input>{damageType}</label></li>)}
    </ul>
    {hitsToRender}
  </div >);
}

export default HitResults;