'use strict'

module.exports = function (description, baseDamageAmount) {
    const reductions = [];
    return {
        registerReduction: function (source, damageAfterReduction, totalPercentage) {
            reductions.push({
                source: source,
                damageAfterReduction: damageAfterReduction
            })
        },
        summarise: function () {
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
            return damageData;
        }
    }
}
