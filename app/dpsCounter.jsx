import React, { useEffect, useState } from 'react'
import TargetDamageFileWatcher from './analyse/watchers/targetDamageScan';

const DPSCounter = ({ characterName, basePath }) => {
  console.log('Render')
  const [lastTotal, setLastTotal] = useState({ total: 0, averageDps: 0 });
  let shotBuffer = [];
  let timeout;

  const clearShots = () => {
    console.log('clearing shots')
    if (timeout) clearTimeout(timeout);
    let totalDamage = { total: 0, averageDps: 0, shotsCounted: shotBuffer.length };
    let temp = [...shotBuffer];
    temp.map(shot => {
      console.log('shot iteration', shot)
      shot.map(damageType => {
        console.log('damageType iteration', damageType)
        if (!totalDamage[damageType.description]) totalDamage[damageType.description] = 0;
        totalDamage[damageType.description] += damageType.baseDamageAmount;
        totalDamage.total += damageType.baseDamageAmount;
      })
    })
    totalDamage.averageDps = (totalDamage.total / 30).toFixed(2);
    setLastTotal(totalDamage);

    shotBuffer = []
    timeout = setTimeout(() => clearShots(), 30000);
  }

  const handleShotFired = logs => {
    console.log('buffering', logs, 'to', shotBuffer);
    shotBuffer = [logs, ...shotBuffer];
  }

  useEffect(() => {
    if (!characterName) return;
    const targetDamageFileWatcher = new TargetDamageFileWatcher({
      render: logs => {
        if (!logs.length) return;
        handleShotFired(logs);
      }
    }, characterName)
    targetDamageFileWatcher.scan({}, basePath);
    clearShots();
  }, []);

  return (<div id="dpsCounter">
    <h2>Damage Summary (last 30 seconds)</h2>
    <h2>Hits registered: {lastTotal.shotsCounted}</h2>
    <h2>Total Damage: {lastTotal.total}</h2>
    <h2>Average DPS: {lastTotal.averageDps}</h2>
    <table className="breakdown">
      <tbody>
        {Object.keys(lastTotal).map(damageType => {
          if (damageType === 'averageDps' || damageType === 'total' || damageType === 'shotsCounted') return;
          return <tr key={damageType}>
            <td>{damageType}</td>
            <td>{(lastTotal[damageType] / lastTotal.total * 100).toFixed(2)}%</td>
          </tr>
        })}
      </tbody>
    </table>
  </div>)
}

export default DPSCounter;