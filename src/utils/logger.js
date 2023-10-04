const { createLogger, format, transports, addColors } = require('winston');

const myLevels = {
  error: 0,
  warn: 1,
  info: 2,
  done: 3,
  debug: 4
};

const myColors = {
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  done: 'green'
};

addColors(myColors);

const logger = createLogger({
  levels: myLevels,
  level: 'debug',
  format: format.combine(format.colorize({ all: true }), format.simple()),
  transports: [new transports.Console()]
});

module.exports = logger;
