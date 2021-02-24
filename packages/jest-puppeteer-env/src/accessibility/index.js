const { AxePuppeteer } = require('@axe-core/puppeteer');

const analyze = (page) => new AxePuppeteer(page).analyze();

// the order of the items describes their severity (low -> high)
const failLevels = ['moderate', 'serious', 'critical'];
const checkViolations = ({ violations, failLevel }) => {
  const failLevelIndex = failLevels.indexOf(failLevel);

  if (failLevelIndex === -1) {
    throw new Error(`Fail level must be one of: ${failLevels}, received: ${failLevel}`);
  }

  return violations.filter((violation) => {
    const itemFailLevelIndex = failLevels.indexOf(violation.impact);

    return itemFailLevelIndex >= failLevelIndex;
  });
};

module.exports = {
  analyze,
  checkViolations
};
