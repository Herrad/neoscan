import Resistance from './resistance'

const DamageType = ({ damageEntry }) => {

    const resistancesToRender = damageEntry.reductions.map(reduction => {
      return <Resistance reduction={reduction} totalReducedDamage={damageEntry.reducedDamage} key={reduction.source} />
    })
  
    return (<tr className={damageEntry.description}>
      <td>{damageEntry.totalDamageAfterReduction.toFixed(2)}</td>
      <td>{damageEntry.baseDamageAmount.toFixed(2)}</td>
      <td>{damageEntry.reducedDamage.toFixed(2)}</td>
      <td>{damageEntry.description}</td>
      <td className="resistance">{resistancesToRender}</td>
    </tr>)
}

export default DamageType