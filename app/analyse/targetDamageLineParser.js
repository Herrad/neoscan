'use strict'
import Hit from './Hit';

function TargetDamageLineParser(renderer, characterName) {
  const newHitRegex = new RegExp(/DAMAGEINFO\s-\sTime\s[0-9\.]+ Damage \(([a-zA-Z0-9\s\-]+)\)/);
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
      const newHit = newHitRegex.exec(line);
      if (newHit && newHit.length) {
        if (currentHit) currentHit.close();
        currentHit = undefined;
        if (recordHitRegex.test(line)) {
          currentHit = new Hit(renderer);
        } else {
          renderer.addDamageSource(newHit[1])
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