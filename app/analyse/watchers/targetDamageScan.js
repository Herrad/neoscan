'use strict'
const Tail = require('tail').Tail
import TargetDamageLineParser from '../targetDamageLineParser';
import logFile from '../logFile';

function TargetDamageFileWatcher(renderer, characterName) {
  const parser = new TargetDamageLineParser(renderer, characterName);

  function poll(options, path) {
    const scan = new Tail(path);

    scan.on('line', parser.parse.bind(null, options));
  }

  return {
    scan: function (options, path) {
      poll(options, logFile("Damage", path));
    }
  }
}

export default TargetDamageFileWatcher
