'use strict'
import Hit from './Hit';

function TargetDamageLineParser(renderer, characterName) {
  const newHitRegex = new RegExp(`DAMAGEINFO - Time [0-9\.]+ Damage \(${characterName}\)`);
  const newTypeRegex = new RegExp(/INS\s-\s([A-Z]+):\s([0-9\.]+)/);
  const typeMap = {
    PRC: 'Piercing',
    FOR: 'Force',
    POR: 'Poison',
    FIR: 'Fire',
    ENR: 'Energy',
    XRR: 'XRay'
  }
  let currentHit = new Hit(renderer);

  function typeIsFilteredOut(type, options) {
    return Object.keys(options).reduce((result, filter) => result || filter === type.toLowerCase(), false);
  }

  return {
    parse: function (options, line) {
      if (newHitRegex.test(line)) {
        currentHit.close();
        currentHit = new Hit(renderer);
        return;
      }

      const newType = newTypeRegex.exec(line);
      if (newType && newType.length) {
        const damage = parseFloat(newType[1]);
        let type = typeMap[newType[0]];
        if (damage < 0) type = 'Healing'
        if (typeIsFilteredOut(type, options)) return;
        currentHit.regesterType(type, damage);
        return;
      }
    }
  }
}

export default TargetDamageLineParser