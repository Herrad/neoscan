'use strict'
const fs = require('fs');
const LineParser = require('./lineParser');
const crash = require('../crash');
const logFile = require('./logFile');

module.exports = function scanner(renderer) {
    const parser = new LineParser(renderer);

    function runScan(characterName, path, lineRead) {
        const stream = require('readline').createInterface({
            input: fs.createReadStream(logFile(characterName, path))
        });
        stream.on('line', lineRead);
        stream.on('error', crash);
    }

    return {
        scan: function(options, characterName, path) {
            runScan(characterName, path, parser.parse.bind(null, options))
        },
        dumb: function(characterName, path) {
            runScan(characterName, path, parser.dumb)
        }
    }
}
