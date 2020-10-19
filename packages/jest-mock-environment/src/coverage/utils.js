const filterByUrl = (collectCoverageFrom) => ({ url }) => {
  const shouldCollectCoverage = collectCoverageFrom.some((urlRegex) => new RegExp(urlRegex, 'u').test(url));

  return shouldCollectCoverage;
};

const removeCoverageText = (coverage) => {
  const mappedCoverage = {
    ...coverage
  };

  delete mappedCoverage.text;

  return mappedCoverage;
};

const calculateCoverageDetails = (jsCoverage, cssCoverage) => {
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
    percentage
  };
};

const printCoverages = ({ logger, coverages }) => {
  logger.info(coverages);
};

module.exports = {
  calculateCoverageDetails,
  filterByUrl,
  printCoverages,
  removeCoverageText
};
