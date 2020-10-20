const { filterByUrl, removeCoverageText, calculateCoverageDetails } = require('./utils');
const { getDetailsReport } = require('./reporter');

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

  const { usedBytes, totalBytes, percentage } = calculateCoverageDetails(finalJSCoverage, finalCSSCoverage);

  // This must be done after the calculate method as that depends on the text length.
  if (!recordCoverageText) {
    finalJSCoverage = finalJSCoverage.map(removeCoverageText);
    finalCSSCoverage = finalCSSCoverage.map(removeCoverageText);
  }

  const details = {
    usedBytes,
    totalBytes,
    percentage,
    coverageDetails: {
      js: finalJSCoverage,
      css: finalCSSCoverage
    }
  };

  const report = getDetailsReport(details);

  return {
    ...details,
    ...report
  };
};

module.exports = {
  startCollecting,
  getCoverage
};
