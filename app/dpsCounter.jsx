import React, { useState, useEffect } from 'react'
import TargetDamageFileWatcher from './analyse/watchers/targetDamageScan';

const DPSCounter = ({ characterName, basePath }) => {
  const [shots, setShots] = useState([]);
  const [lastTotal, setLastTotal] = useState({ total: 0, averageDps: 0 });
  let buffer = [];

  const clearShots = () => {
    console.log('shots', shots);
    let totalDamage = { total: 0, averageDps: 0 };
    shots.map(shot => shot.map(damageType => {
      totalDamage[damageType.description] += damageType.baseDamageAmount;
      totalDamage.total += totalDamage.baseDamageAmount;
    }))
    totalDamage.averageDps = (totalDamage.total / 5).toFixed(2);
    setLastTotal(totalDamage);

    setShots([]);
    setTimeout(() => clearShots(), 5000);
  }

  const handleShotFired = logs => {
    buffer = [logs, ...buffer, ...shots];

    setShots(buffer);
  }

  useEffect(() => {
    clearShots();
    if (!characterName) return;
    const targetDamageFileWatcher = new TargetDamageFileWatcher({
      render: logs => {
        if (!logs.length) return;
        handleShotFired(logs)
      }
    }, characterName)
    targetDamageFileWatcher.scan({}, basePath)
  }, []);


  return <div id="dpsCounter">
    <h2>Total Damage over last 5 seconds</h2>
    <span>{lastTotal.total}</span>
    <h2>Average DPS</h2>
    <span>{lastTotal.averageDps}</span>
    <table className="breakdown">
      <tbody>
        {Object.keys(lastTotal).map(damageType => {
          if (damageType === 'averageDps' || damageType === 'total') return;
          return <tr key={damageType}>
            <td>{damageType}</td>
            <td>{(lastTotal[damageType] / lastTotal.totalDamage * 100).toFixed(2)}%</td>
          </tr>
        })}
      </tbody>
    </table>
  </div>
}

export default DPSCounter;