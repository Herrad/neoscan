import React from 'react';

const Resistance = ({ reduction, totalReducedDamage } = []) => (
    <li className="resistance">
        {reduction.source} {reduction.reducedDamageBy.toFixed(2)} ({(reduction.reducedDamageBy / totalReducedDamage * 100).toFixed(0)}%)
    </li>
)

export default Resistance
