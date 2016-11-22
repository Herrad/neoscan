'use strict'
const colors = require('colors');
const logging = require('./logging');

module.exports = function(description, baseDamageAmount, classCap, characterName) {
    classCap = classCap || 80
    const reductionColours = {
        shield: 'cyan',
        armor: 'green',
        skills: 'yellow'
    }
    const typeColours = {
        Piercing: 'white',
        Force: 'grey',
        Fire: 'red',
        Energy: 'bgBlue',
        "X-ray": 'cyan',
        "X-Ray": 'cyan',
        Poison: 'green',
        Healing: 'yellow'
    }
    const reductions = [];
    let damageAfterReduction = 0;
    let capReached = false;
    return {
        registerReduction: function (source, damageAfterReduction, totalPercentage) {
            if(capReached) return;
            if(totalPercentage >= classCap) {
                damageAfterReduction = Math.round(baseDamageAmount * (100-classCap)/100)
                capReached = true;
            }
            reductions.push({
                source: source,
                damageAfterReduction: damageAfterReduction
            })
        },
        summarise: function(table) {
            reductions.reduce((lastReduction, reduction) => {
                const damageAfterThisReduction = lastReduction - reduction.damageAfterReduction;
                reduction.reducedDamageBy = damageAfterThisReduction;
                return reduction.damageAfterReduction;
            }, baseDamageAmount);

            const reducedDamage = reductions.reduce((total, reduction) => total + reduction.reducedDamageBy, 0);

            const reductionsMessage = reductions.map(reduction => {
                return `${reduction.source} ${reduction.reducedDamageBy.toFixed(2)} (${(reduction.reducedDamageBy/reducedDamage*100).toFixed(0)}%)`[reductionColours[reduction.source]];
            }).join(' ');
            const reductionsToLog = reductions.map(reduction => {
                return {
                    source: reduction.source,
                    total_reduction: reduction.reducedDamageBy.toFixed(2),
                    percentage: (reduction.reducedDamageBy/reducedDamage*100).toFixed(0)
                }
            });
            logging.logInfo('damage type', {
                damage_taken: (baseDamageAmount-reducedDamage).toFixed(2),
                total_received: baseDamageAmount.toFixed(2),
                reduced_by: reducedDamage.toFixed(2),
                damage_type: description,
                reductions:reductionsToLog,
                capped:capReached,
                character_name: characterName
            });
            table.push([
                `${(baseDamageAmount-reducedDamage).toFixed(2)}`[typeColours[description]] || `${(baseDamageAmount-reducedDamage).toFixed(2)}`,
                `${baseDamageAmount.toFixed(2)}`[typeColours[description]] || `${baseDamageAmount.toFixed(2)}`,
                `${reducedDamage.toFixed(2)} (${(reducedDamage/baseDamageAmount*100).toFixed(2)}%)`[typeColours[description]] || `${reducedDamage.toFixed(2)}`,
                `${description}`[typeColours[description]] || `${description}`,
                reductionsMessage,
                capReached
            ]);
        }
    }
}
