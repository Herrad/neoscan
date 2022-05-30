'use strict'
const Tail = require('tail').Tail
const LineParser = require('./lineParser');
const crash = require('../crash');
const logFile = require('./logFile')

module.exports = function createLiveScanner(renderer) {
    const parser = new LineParser(renderer);

    function poll(options, path) {
        const scan = new Tail(path);

        scan.on('line', parser.parse.bind(null, options));
        scan.on('error', crash);
    }

    return {
        watchLogFile: function(options, characterName, path) {
            poll(options, logFile(characterName, path));
        }
    }
}
