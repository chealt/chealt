const { checkBundleSize: checkBundleSizeFactory } = require('./bundleSize');

const performance = async ({ page, client, config }) => {
  const enabling = client.send('Performance.enable');

  const getMetrics = () =>
    Promise.all([
      page.evaluate(() => JSON.stringify(window.performance.getEntries())),
      enabling.then(() => client.send('Performance.getMetrics')).then(({ metrics }) => metrics),
      page.metrics()
    ]).then(([entries, metrics, pageMetrics]) => ({
      entries: JSON.parse(entries),
      metrics,
      pageMetrics
    }));

  const checkBundleSize = config.performance?.bundleSizes
    ? checkBundleSizeFactory({ bundleSizes: config.performance.bundleSizes })
    : undefined;

  return {
    checkBundleSize,
    getMetrics
  };
};

module.exports = performance;
