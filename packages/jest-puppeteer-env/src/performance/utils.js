const getMetricsSummary = (metrics) => {
  const summary = {};

  if (metrics.entries) {
    const firstPaint = metrics.entries.find((entry) => entry.name === 'first-paint');
    const firstContentfulPaint = metrics.entries.find((entry) => entry.name === 'first-contentful-paint');

    summary.firstPaint = firstPaint.startTime;
    summary.firstContentfulPaint = firstContentfulPaint.startTime;

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

module.exports = { getMetricsSummary };
