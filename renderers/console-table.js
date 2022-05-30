'use strict'
const Table = require('cli-table');
require('colors')

module.exports = function createRenderer() {
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

  return {
    render: (damageTypes) => {
      console.log('hello'['yellow'])
      const table = new Table({
        head: ['Damage Taken', 'Maximum Damage', 'Reduced By', 'Type', 'Resistance Breakdown'],
        colWidths: [15, 20, 18, 15, 75]
      });

      damageTypes.map(damageData => {
        const reductionsMessage = damageData.reductions.map(reduction => {
          return `${reduction.source} ${reduction.reducedDamageBy.toFixed(2)} (${(reduction.reducedDamageBy / damageData.reducedDamage * 100).toFixed(0)}%)`[reductionColours[reduction.source]];
        }).join(' ');

        table.push([
          `${damageData.totalDamageAfterReduction.toFixed(2)}`[typeColours[damageData.description]] || `${damageData.totalDamageAfterReduction.toFixed(2)}`,
          `${damageData.baseDamageAmount.toFixed(2)}`[typeColours[damageData.description]] || `${damageData.baseDamageAmount.toFixed(2)}`,
          `${damageData.reducedDamage.toFixed(2)} (${(damageData.reducedDamage / damageData.baseDamageAmount * 100).toFixed(2)}%)`[typeColours[damageData.description]] || `${damageData.reducedDamage.toFixed(2)}`,
          `${damageData.description}`[typeColours[damageData.description]] || `${damageData.description}`,
          reductionsMessage
        ])
      })

      if (table.length > 0) {
        console.log(table.toString());
      }
    }
  }
}