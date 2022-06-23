'use strict'
const logPath = "C:\\Games\\Neocron Evolution 2.5\\logs"
const envLogPath = process.env.NEOSCAN_LOG_PATH

function LogFile(characterName, basePath) {
    basePath = basePath || envLogPath || logPath;
    return `${basePath}\\${characterName}_00.log`;
}

export default LogFile