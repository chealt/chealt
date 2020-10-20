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

const getLogger = (level) => {
  const noop = () => null;

  return {
    debug:
            level <= logLevels.debug
              ? (message, prefix) => {
                console.log(prefix ? prefix : chalk.bold.dim(' DEBUG '), chalk.grey(message));
              }
              : noop,
    info:
            level <= logLevels.info
              ? (message, prefix) => {
                console.log(prefix ? prefix : chalk.bold.inverse(' INFO '), chalk.white(message));
              }
              : noop,
    warning:
            level <= logLevels.warning
              ? (message, prefix) => {
                console.log(prefix ? prefix : chalk.bold.bgYellow(' WARN '), chalk.white(message));
              }
              : noop,
    error:
            level <= logLevels.error
              ? (message, prefix) => {
                console.log(prefix ? prefix : chalk.bold.bgRed(' ERROR '), chalk.white(message));
              }
              : noop
  };
};

module.exports = { getLogger, logLevels };
