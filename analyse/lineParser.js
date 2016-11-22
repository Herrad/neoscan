'use strict'
const Hit = require('../Hit');

module.exports = function createParser() {
    const newTypeRegex = new RegExp(/Damage:\s(\-?[0-9]+\.[0-9]+)\sTarget\s([\w\-]+)\s/);
    const newHitRegex = new RegExp(/Local Player:Damage/);
    const newReductionRegex = new RegExp(/Damage:\s([0-9]+\.[0-9]+)\s\(Reduction: ([0-9]+\.[0-9]+)\s\-\s([0-9]+\.[0-9]+)\sPercentage\)\s\-[\w\s]+(armor|skills|shield)/);
    let currentHit = new Hit();

    function typeIsFilteredOut(type, options) {
        return Object.keys(options).reduce((result, filter) => result || filter === type.toLowerCase(), false);
    }

    return {
        parse: function (options, characterName, line) {
            if(line.startsWith('Character System: Acceleration ')) return;

            if(newHitRegex.test(line)) {
                currentHit.close();
                currentHit = new Hit(characterName, parseInt(options.cap));
                return;
            }

            const newType = newTypeRegex.exec(line);
            if(newType && newType.length) {
                const damage = parseFloat(newType[1]);
                let type = newType[2];
                if(damage < 0) type = 'Healing'
                if(typeIsFilteredOut(type, options)) return;
                currentHit.closeType();
                currentHit.regesterType(type, damage);
                return;
            }

            const newReduction = newReductionRegex.exec(line);
            if(newReduction && newReduction.length) {
                const damageAfterReduction = parseFloat(newReduction[1]);
                const ongoingTotalReduction = parseFloat(newReduction[2]);
                const ongoingTotalPercentage = parseFloat(newReduction[3]);
                const reductionSource = newReduction[4];
                currentHit.reduceType(reductionSource, damageAfterReduction, ongoingTotalPercentage);
                return;
            }
        },
        dumb: function (line) {
            if(line.startsWith('Character System: Acceleration ')) return;
            console.log(line);
        }
    }
}
