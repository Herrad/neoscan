'use strict'
const DamageType = require('./DamageType');

module.exports = function (renderer) {
    let currentType = 0;

    const damageData = [];

    function closeType() {
        if (currentType) {
            damageData.push(currentType.summarise());
            currentType = 0;
        }
    }

    function log() {
        closeType();
        console.log('rendering')
        renderer.render(damageData);
    }

    const logTimeout = setTimeout(log, 500);

    return {
        regesterType: function (typeName, damage) {
            closeType();
            currentType = new DamageType(typeName, damage);
        },
        reduceType: function (reductionSource, damageAfterReduction, totalPercentage) {
            if (!currentType) return;
            currentType.registerReduction(reductionSource, (damageAfterReduction), (totalPercentage));
        },
        close: () => {
            clearTimeout(logTimeout)
            log();
        }
    }
}
