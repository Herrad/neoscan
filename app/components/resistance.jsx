import React from 'react';

const Resistance = ({ reduction, totalReducedDamage, baseDamageAmount } = []) => (
    <li className="resistance">
        {reduction.source} {reduction.reducedDamageBy.toFixed(2)} ({(reduction.reducedDamageBy / baseDamageAmount * 100).toFixed(2)}%)
    </li>
)

export default Resistance
