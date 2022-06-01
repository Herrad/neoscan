import DamageType from './damagetype'

const HitTable = ({ hitData = [] }) => {
    const dataToRender = hitData.map(damageType => {
      return <DamageType damageEntry={damageType} key={damageType.description} />
    })
  
    if (!dataToRender.length) return;
  
    return (
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