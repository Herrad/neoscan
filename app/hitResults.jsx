import React, { useEffect, useState } from "react";
import HitTable from "./components/hitTable";
import FileWatcher from './analyse/watchers/liveScan';

const DAMAGE_TYPES = [
  "Healing", "Force", "Piercing", "Fire", "Energy", "XRay", "Poison"
]

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
    if (characterName) fileWatcher.scan({}, characterName, basePath)
  }, []);

  const hitsToRender = hitHistory.map((hitData, i) => {
    return <HitTable hitData={hitData} filterState={allowedDamageTypes} key={`hit-${i}`} />
  });

  return (<div id="hit-content">
    <a onClick={resetCharacterSelected}>Return to Character Selection</a>
    <ul>
      {Object.keys(allowedDamageTypes).map((damageType) => <li key={damageType}><input type="checkbox" name={damageType} onChange={toggleDamageType} checked={allowedDamageTypes[damageType]}></input><label htmlFor={damageType}>{damageType}</label></li>)}
    </ul>
    {hitsToRender}
  </div >);
}

export default HitResults;