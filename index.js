'use strict'
const program = require('commander');
const watch = require('./analyse/liveScan')().watchLogFile;
const scanner = require('./analyse/scan')();
const server = require('./web')();

program
    .command('watch <name> [path]')
    .description(`Watches a neocron log file in real-time`)
    .action(watch.bind(null, program))

program
    .command('scan <name> [path]')
    .description(`Scans an existing neocron log file and exits`)
    .action(scanner.scan.bind(null, program))

program
    .command('dumbscan <name> [path]')
    .description(`Scans an existing neocron log file and exits`)
    .action(scanner.dumb)

program
    .command('web [path]')
    .description('Launches a web server and page to view logs')
    .action(server.launch)

program
    .option('-h, --healing', 'filter out healing results')
    .option('-c, --piercing', 'filter out piercing results')
    .option('-o, --force', 'filter out force results')
    .option('-f, --fire', 'filter out fire results')
    .option('-p, --poison', 'filter out poison results')
    .option('-e, --energy', 'filter out energy results')
    .option('-x, --xray', 'filter out xray results')
    .option('--cap [value]', 'overrides cap with value, defaults to 80')
    .option('--dashboard', 'sends data to kibana')
    .parse(process.argv)
