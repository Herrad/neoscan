'use strict'
const Tail = require('tail').Tail
import LineParser from '../lineParser';
import logFile from '../logFile';

function FileWatcher(renderer) {
    const parser = new LineParser(renderer);

    function poll(options, path) {
        const scan = new Tail(path);

        scan.on('line', parser.parse.bind(null, options));
    }

    return {
        scan: function (options, characterName, path) {
            poll(options, logFile(characterName, path));
        }
    }
}

export default FileWatcher
