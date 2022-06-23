'use strict'
import LineParser from '../lineParser';

function FileWatcher(renderer) {
  const parser = new LineParser(renderer);

  function beginSimulation() {
    simulateHit(['Force', 'Piercing', 'Poison'])
  }

  function simulateHit(damageTypes) {
    const newHitString = 'Local Player:Damage() - Damage processing statistics!';
    parser.parse([], newHitString);
    damageTypes.forEach((damageType, counter) => {
      const damageAmount = toFixed3Digits(100 * Math.random());
      const resistances = [
        { type: 'shield', value: toFixed3Digits(Math.random() * damageAmount / 3) },
        { type: 'armor', value: toFixed3Digits(Math.random() * damageAmount / 4) },
        { type: 'skills', value: toFixed3Digits(Math.random() * damageAmount / 10) }
      ];
      setTimeout(() => simulateDamage(damageType, damageAmount, resistances, counter + 1).forEach(line => parser.parse([], line)), 10 * (counter + 1))
    });
  }

  function simulateDamage(type, amount, resistances, part) {
    const lines = [`Damage: ${amount} Target ${type} HitZone 0 - Part ${part}`];
    let remainingDamage = amount;
    let runningTotal = 0;
    resistances.forEach(resistance => {
      remainingDamage = toFixed3Digits(remainingDamage - resistance.value);
      runningTotal = toFixed3Digits(runningTotal + resistance.value);
      const percentage = toFixed3Digits(runningTotal / amount * 100);
      lines.push(`Damage: ${remainingDamage} (Reduction: ${runningTotal} - ${percentage} Percentage) - Damage reduced by player ${resistance.type}`);
    })
    const percentage = toFixed3Digits(runningTotal / amount * 100);
    lines.push(`Results of this target: Damage ${remainingDamage} (Reduction: ${runningTotal} - ${percentage} Percentage) - ResistanceCap: 0.760!`)
    return lines;
  }

  function toFixed3Digits(num) {
    var pow = Math.pow(10, 3);
    return Math.round(num * pow) / pow;
  }

  return {
    scan: function () {
      beginSimulation();
    }
  }
}

export default FileWatcher