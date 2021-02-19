/* eslint-disable no-console */
const chalk = require('chalk');

const logLevels = {
  debug: 1,
  info: 2,
  warning: 3,
  error: 4,
  // DEFAULT LOG LEVEL
  default: 2
};

const defaultLoggers = {
  debug: (message, prefix) => {
    console.log(prefix ? prefix : chalk.bold.dim(' DEBUG '), chalk.grey(message));
  },
  info: (message, prefix) => {
    console.log(prefix ? prefix : chalk.bold.inverse(' INFO '), chalk.white(message));
  },
  warning: (message, prefix) => {
    console.log(prefix ? prefix : chalk.bold.bgYellow(' WARN '), chalk.white(message));
  },
  error: (message, prefix) => {
    console.log(prefix ? prefix : chalk.bold.bgRed(' ERROR '), chalk.white(message));
  }
};

const getLogger = (level) => ({
  debug: level <= logLevels.debug ? defaultLoggers.debug : () => null,
  info: level <= logLevels.info ? defaultLoggers.info : () => null,
  warning: level <= logLevels.warning ? defaultLoggers.warning : () => null,
  error: level <= logLevels.error ? defaultLoggers.error : () => null
});

module.exports = { getLogger, logLevels };
