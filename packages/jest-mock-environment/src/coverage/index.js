const startCollecting = (page) => Promise.all([
  page.coverage.startJSCoverage(),
  page.coverage.startCSSCoverage()
]);

const getCoverage = async (page, collectCoverageFrom) => {
  const [jsCoverage, cssCoverage] = await Promise.all([
    page.coverage.stopJSCoverage(),
    page.coverage.stopCSSCoverage()
  ]);
  const finalJSCoverage = jsCoverage;
  const finalCSSCoverage = cssCoverage;

  if (collectCoverageFrom) {
    // TODO: filter coverage data based on config
    finalJSCoverage = jsCoverage.filter((coverage) => coverage);
    finalCSSCoverage = cssCoverage.filter((coverage) => coverage);
  }

  let totalBytes = 0;
  let usedBytes = 0;
  const coverage = [...jsCoverage, ...cssCoverage];

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
