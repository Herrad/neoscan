'use strict'

function DamageType(description, baseDamageAmount) {
    const reductions = [];
    let isClosed = false;
    return {
        registerReduction: function (source, damageAfterReduction, totalPercentage) {
            if (isClosed) return;
            reductions.push({
                source: source,
                damageAfterReduction: damageAfterReduction
            })
        },
        summarise: function () {
            if (isClosed) return;
            const damageData = { description: description };
            reductions.reduce((lastReduction, reduction) => {
                const damageAfterThisReduction = lastReduction - reduction.damageAfterReduction;
                reduction.reducedDamageBy = damageAfterThisReduction;
                return reduction.damageAfterReduction;
            }, baseDamageAmount);

            damageData.reducedDamage = reductions.reduce((total, reduction) => total + reduction.reducedDamageBy, 0);

            damageData.reductions = reductions;
            damageData.baseDamageAmount = baseDamageAmount;
            damageData.totalDamageAfterReduction = (baseDamageAmount - damageData.reducedDamage);
            isClosed = true;
            return damageData;
        }
    }
}

export default DamageType