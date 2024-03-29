import React from 'react';
import Resistance from './resistance'

const DamageType = ({ damageEntry, filterState }) => {

  if (damageEntry.length === 0) return;

  const resistancesToRender = damageEntry.reductions.map(reduction => {
    return <Resistance reduction={reduction} totalReducedDamage={damageEntry.reducedDamage} baseDamageAmount={damageEntry.baseDamageAmount} key={reduction.source} />
  })

  const displayNone = () => {
    if (filterState[damageEntry.description]) return '';
    return ' hidden'
  }

  return (<tr className={damageEntry.description + displayNone()}>
    <td>{damageEntry.totalDamageAfterReduction.toFixed(2)}</td>
    <td>{damageEntry.baseDamageAmount.toFixed(2)}</td>
    <td>{damageEntry.reducedDamage.toFixed(2)} ({(damageEntry.reducedDamage / damageEntry.baseDamageAmount * 100).toFixed(2)}%)</td>
    <td>{damageEntry.description}</td>
    <td className="resistances"><ul>{resistancesToRender}</ul></td>
  </tr>)
}

export default DamageType