const formatSize = (size) => `${(size / 1024 / 1024).toFixed(2)} MB`;
const formatRawSize = (size) => new Intl.NumberFormat().format(size);
const formatPercentage = (percentage) => `${percentage.toFixed(2)}%`;
const getDetailsSummary = (details) => {
  const { totalBytes, usedBytes, percentage } = details;
  const totalFormatted = formatSize(totalBytes);
  const totalRawFormatted = formatRawSize(totalBytes);
  const totalReport = `${totalFormatted} (${totalRawFormatted} B)`;
  const usedFormatted = formatSize(usedBytes);
  const usedRawFormatted = formatRawSize(usedBytes);
  const usedReport = `${usedFormatted} (${usedRawFormatted} B)`;
  const percentageFormatted = formatPercentage(percentage);

  return {
    totalFormatted,
    totalReport,
    usedFormatted,
    usedReport,
    percentageFormatted,
    ...details
  };
};

module.exports = {
  getDetailsSummary
};
