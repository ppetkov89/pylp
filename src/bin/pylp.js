#!/usr/bin/env node

const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const logger = require('../utils/logger');
const taker = require('../tasks/taker');

function loadConfig(configPath) {
  try {
    return require(path.resolve(process.cwd(), configPath));
  } catch (err) {
    logger.error('Failed to load configuration from ' + configPath + ': ' + err.message);
    process.exit(1);
  }
}

function executeTask(taskName) {
  if (typeof taker.series !== 'function') {
    logger.error('The "series" method is not available in the pylp module.');
    process.exit(1);
  }

  if (typeof taker._registry._tasks[taskName] === 'undefined') {
    logger.error('Task "' + taskName + '" not found.');
    process.exit(1);
  }

  const task = taker.series(taskName);

  task(function (err) {
    if (err) {
      logger.error('Error executing task "' + taskName + '": ' + err.message);
      process.exit(1);
    } else {
      logger.info('Task "' + taskName + '" executed successfully.');
    }
  });
}

function main() {
  const argv = yargs(hideBin(process.argv)).command('$0 [task]', 'run a specified task', function (yargsBuilder) {
    yargsBuilder
      .positional('task', {
        describe: 'name of the task to run',
        type: 'string'
      })
      .option('config', {
        alias: 'c',
        type: 'string',
        description: 'Path to the configuration file',
        default: 'pylp.js'
      });
  }).argv;

  loadConfig(argv.config);
  executeTask(argv.task);
}

main();
