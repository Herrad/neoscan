const Resistance = ({ reduction, totalReducedDamage }) => (
    <span className="resistance">
        {reduction.source} {reduction.reducedDamageBy.toFixed(2)} ({(reduction.reducedDamageBy / totalReducedDamage * 100).toFixed(0)}%)
    </span>
)

export default Resistance
