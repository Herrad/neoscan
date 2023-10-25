'use strict'
import Hit from './Hit';

function TargetDamageLineParser(renderer, characterName) {
  const newHitRegex = new RegExp(/DAMAGEINFO\s-\sTime\s[0-9\\.]+ Damage/);
  const recordHitRegex = new RegExp(`DAMAGEINFO - Time [0-9\\.]+ Damage \\(${characterName}\\)`);
  const newTypeRegex = new RegExp(/INS\s-\s([A-Z]+):\s([0-9\.]+)/);
  const typeMap = {
    PCR: 'Piercing',
    FCR: 'Force',
    POR: 'Poison',
    FIR: 'Fire',
    ENR: 'Energy',
    XRR: 'XRay'
  }
  let currentHit = new Hit(renderer);

  function typeIsFilteredOut(type, options) {
    return Object.keys(options).reduce((result, filter) => result || filter === type.toLowerCase(), false);
  }

  console.log('looking for new hits matching', newHitRegex)
  console.log('looking for new damage types matching', newTypeRegex)

  return {
    parse: function (options, line) {
      if (newHitRegex.test(line)) {
        if (currentHit) currentHit.close();
        currentHit = undefined;
        if (recordHitRegex.test(line)) {
          console.log('line matched record', line)
          currentHit = new Hit(renderer);
        }
        return;
      }

      const newType = newTypeRegex.exec(line);
      if (currentHit && newType && newType.length) {
        const damage = parseFloat(newType[2]);
        let type = typeMap[newType[1]];
        if (damage < 0) type = 'Healing'
        if (typeIsFilteredOut(type, options)) return;
        currentHit.regesterType(type, damage);
        return;
      }
    }
  }
}

export default TargetDamageLineParser