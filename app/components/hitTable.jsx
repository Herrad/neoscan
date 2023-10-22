import React from 'react'
import DamageType from './damagetype'

const HitTable = ({ hitData, filterState }) => {
  if (hitData.length === 0) return;

  const dataToRender = hitData.map(damageType => {
    return <DamageType damageEntry={damageType} filterState={filterState} key={damageType.description} />
  })

  const shouldDisplayHit = () => {
    let allHidden = true;
    hitData.map(damageType => allHidden = allHidden && !filterState[damageType.description])
    return allHidden;
  }

  return shouldDisplayHit() ? '' : (
    <div className="hit">
      <h2>Hit Registered!</h2>
      <table>
        <thead>
          <tr>
            <th>Damage Taken</th>
            <th>Maximum Damage</th>
            <th>Reduced By</th>
            <th>Type</th>
            <th className="resistance">Resistance Breakdown</th>
          </tr>
        </thead>
        <tbody>
          {dataToRender}
        </tbody>
      </table>
    </div>
  );
}

export default HitTable