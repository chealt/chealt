const { filterByUrl, removeCoverageText } = require('./utils');

const startCollecting = (page) => Promise.all([
  page.coverage.startJSCoverage(),
  page.coverage.startCSSCoverage()
]);

const getCoverage = async ({ page, collectCoverageFrom, recordCoverageText }) => {
  const [jsCoverage, cssCoverage] = await Promise.all([
    page.coverage.stopJSCoverage(),
    page.coverage.stopCSSCoverage()
  ]);
  let finalJSCoverage = jsCoverage;
  let finalCSSCoverage = cssCoverage;

  if (collectCoverageFrom) {
    const byUrl = filterByUrl(collectCoverageFrom);
    finalJSCoverage = finalJSCoverage.filter(byUrl);
    finalCSSCoverage = finalCSSCoverage.filter(byUrl);
  }

  if (!recordCoverageText) {
    finalJSCoverage = finalJSCoverage.map(removeCoverageText);
    finalCSSCoverage = finalCSSCoverage.map(removeCoverageText);
  }

  let totalBytes = 0;
  let usedBytes = 0;
  const coverage = [...finalJSCoverage, ...finalCSSCoverage];

  for (const entry of coverage) {
    totalBytes += entry.text.length;

    for (const range of entry.ranges) {
      usedBytes += range.end - range.start - 1;
    }
  }

  const percentage = usedBytes / totalBytes * 100;

  return {
    usedBytes,
    totalBytes,
    percentage,
    coverageDetails: {
      js: finalJSCoverage,
      css: finalCSSCoverage
    }
  };
};

module.exports = {
  startCollecting,
  getCoverage
};
