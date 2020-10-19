const getDetailsSummary = (details) => details;

const printReport = (details, logger) => {
  logger.info(details);
};

module.exports = {
  getDetailsSummary,
  printReport
};
