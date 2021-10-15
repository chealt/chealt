const { checkBundleSize: checkBundleSizeFactory } = require('./bundleSize');
const { getMetricsSummary, networks } = require('./utils');

const performance = async ({ page, client, config }) => {
  const enabling = client.send('Performance.enable');
  await client.send('Network.enable');
  await client.send('ServiceWorker.enable');

  if (config.performance.slowCPU) {
    await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  }

  if (config.performance.emulateNetwork) {
    const networkConditions = networks[config.performance.emulateNetwork];

    await client.send('Network.emulateNetworkConditions', networkConditions);
  }

  const getMetrics = () =>
    Promise.all([
      page.evaluate(() => JSON.stringify(window.performance.getEntries())),
      enabling.then(() => client.send('Performance.getMetrics')).then(({ metrics }) => metrics),
      page.metrics()
    ]).then(([rawEntries, metrics, pageMetrics]) => {
      const entries = JSON.parse(rawEntries);

      return {
        entries,
        metrics,
        pageMetrics,
        summary: getMetricsSummary({ entries })
      };
    });

  const checkBundleSize = config.performance?.bundleSizes
    ? checkBundleSizeFactory({ bundleSizes: config.performance.bundleSizes })
    : undefined;

  return {
    checkBundleSize,
    getMetrics
  };
};

module.exports = performance;
