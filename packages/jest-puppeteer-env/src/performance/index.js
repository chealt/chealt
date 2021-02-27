const getBytes = require('bytes');

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

  const checkBundleSize = (response) => {
    let bundleSizeViolation;
    const headers = response.headers();
    const contentLength = Number(headers['content-length']);
    const contentType = String(headers['content-type']);
    const isJavaScript = contentType.includes('javascript');
    const isStylesheet = contentType.includes('css');
    const url = response.url();
    const bundleSizes = config.performance?.bundleSizes;
    const matchingPatterns = bundleSizes.filter(({ path }) => new RegExp(path, 'u').test(url));

    if (matchingPatterns.length > 1) {
      throw new Error(`URL matches multiple bundle size paths: ${matchingPatterns.join(', ')}`);
    }

    const shouldCheckBundleSize = matchingPatterns.length && (isJavaScript || isStylesheet) && contentLength;

    if (shouldCheckBundleSize) {
      const maxBundleSize = matchingPatterns[0].maxSize;
      const bytes = getBytes(maxBundleSize);

      if (contentLength > bytes) {
        bundleSizeViolation = {
          rule: matchingPatterns[0],
          size: getBytes(contentLength),
          url
        };
      }
    }

    return bundleSizeViolation;
  };

  return {
    checkBundleSize,
    getMetrics
  };
};

module.exports = performance;
