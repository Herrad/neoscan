import React, { useEffect, useState } from 'react'
import TargetDamageFileWatcher from './analyse/watchers/targetDamageScan';

const DPSCounter = ({ characterName, basePath }) => {
  console.log('Render')
  const [encounters, setEncounters] = useState([]);
  let shotBuffer = [];
  let damageSources = [];
  let timeout;
  let startTime;

  const closeEncounter = () => {
    let timeInSeconds = (Math.abs(new Date() - startTime) / 1000) - 10;
    let encounter = {
      totalDamage: 0,
      averageDps: 0,
      shotsCounted: shotBuffer.length,
      damageSources: damageSources,
      startTime: startTime,
      timeInSeconds: timeInSeconds
    };
    shotBuffer.map(shot => shot.map(damageType => encounter.totalDamage += damageType.baseDamageAmount))
    encounter.averageDps = (encounter.totalDamage / timeInSeconds).toFixed(2);

    let tempEncounters = [encounter, ...encounters];
    setEncounters(tempEncounters);

    damageSources = [];
    shotBuffer = []
    startTime = undefined;
  }

  const handleShotFired = logs => {
    if (timeout) clearTimeout(timeout);
    if (!startTime) startTime = new Date();
    shotBuffer = [logs, ...shotBuffer];
    timeout = setTimeout(() => closeEncounter(), 10000);
  }

  useEffect(() => {
    if (!characterName) return;
    const targetDamageFileWatcher = new TargetDamageFileWatcher({
      render: logs => {
        if (!logs.length || logs[0].description === "Healing") return;
        handleShotFired(logs);
      },
      addDamageSource: damageSourceFromLog => {
        if (damageSources.includes(damageSourceFromLog)) return;
        damageSources = [damageSourceFromLog, ...damageSources];
      }
    }, characterName)
    targetDamageFileWatcher.scan({}, basePath);
  }, []);

  const summariseDamageSources = encounter => {
    if (encounter.damageSources.length) return `${encounter.damageSources.slice(5).join(', ')}`;
    return 'UNKNOWN ENEMY'
  }

  return (<ul id="dpsCounter">
    {encounters.map(encounter => {
      return (<li key={encounter.startTime}>
        <h2>ENCOUNTER WITH {summariseDamageSources(encounter)}</h2>
        <p>Hits registered: {encounter.shotsCounted}</p>
        <p>Total Damage: {encounter.totalDamage.toFixed(2)}</p>
        <p>Encounter Length: {encounter.timeInSeconds.toFixed(2)}</p>
        <p>Average DPS: {encounter.averageDps}</p>
      </li>)
    })}
  </ul>)
}

export default DPSCounter;