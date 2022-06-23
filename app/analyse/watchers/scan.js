'use strict'
import fs from 'fs';
import LineParser from '../lineParser';
import LogFile from '../logFile';
import readLine from 'readline';

function FileWatcher(renderer) {
    const parser = new LineParser(renderer);

    function runScan(characterName, path, lineRead) {
        const stream = readLine.createInterface({
            input: fs.createReadStream(LogFile(characterName, path))
        });
        stream.on('line', lineRead);
    }

    return {
        scan: function (options, characterName, path) {
            runScan(characterName, path, parser.parse.bind(null, options))
        },
        dumb: function (characterName, path) {
            runScan(characterName, path, parser.dumb)
        }
    }
}

export default FileWatcher
