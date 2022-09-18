const getMetricsSummary = (metrics) => {
  const summary = {};

  if (metrics.entries) {
    const firstPaint = metrics.entries.find((entry) => entry.name === 'first-paint');
    const firstContentfulPaint = metrics.entries.find(
      (entry) => entry.name === 'first-contentful-paint'
    );

    if (firstPaint) {
      summary.firstPaint = firstPaint.startTime;
    }

    if (firstContentfulPaint) {
      summary.firstContentfulPaint = firstContentfulPaint.startTime;
    }

    const navigationMetrics = metrics.entries.find((entry) => entry.entryType === 'navigation');

    if (navigationMetrics) {
      summary.domCompleted = navigationMetrics.duration;
      summary.DNSLookup = navigationMetrics.domainLookupEnd - navigationMetrics.domainLookupStart;
      summary.connectionTime = navigationMetrics.connectEnd - navigationMetrics.connectStart;
      summary.responseTime = navigationMetrics.requestEnd - navigationMetrics.responseStart;
      summary.domInteractive = navigationMetrics.domInteractive - navigationMetrics.responseEnd;
    }
  }

  return summary;
};

const networks = {
  Fast3G: {
    offline: false,
    downloadThroughput: (1.5 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
    latency: 40
  },
  Slow3G: {
    offline: false,
    downloadThroughput: (750 * 1024) / 8,
    uploadThroughput: (250 * 1024) / 8,
    latency: 100
  }
};

module.exports = { getMetricsSummary, networks };
