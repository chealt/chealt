const performance = async ({ page, client }) => {
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

  return {
    getMetrics
  };
};

module.exports = performance;
