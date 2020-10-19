/* eslint-disable no-console */

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
              ? (message) => {
                console.debug(message);
              }
              : noop,
    info:
            level <= logLevels.info
              ? (message) => {
                console.info(message);
              }
              : noop,
    warning:
            level <= logLevels.warning
              ? (message) => {
                console.warn(message);
              }
              : noop,
    error:
            level <= logLevels.error
              ? (message) => {
                console.error(message);
              }
              : noop
  };
};

module.exports = { getLogger, logLevels };
