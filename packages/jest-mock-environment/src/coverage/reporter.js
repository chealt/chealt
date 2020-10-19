const formatSize = (size) => `${(size / 1024 / 1024).toFixed(2)} MB`;
const formatRawSize = (size) => new Intl.NumberFormat().format(size);
const formatPercentage = (percentage) => (
  new Intl.NumberFormat(undefined, { style: 'unit', unit: 'percent' }).format(percentage.toFixed(2))
);
const getDetailsSummary = (details) => {
  const { totalBytes, usedBytes, percentage } = details;
  const totalFormatted = formatSize(totalBytes);
  const totalRawFormatted = formatRawSize(totalBytes);
  const totalReport = `${totalFormatted} (${totalRawFormatted} B)`;
  const usedFormatted = formatSize(usedBytes);
  const usedRawFormatted = formatRawSize(usedBytes);
  const usedReport = `${usedFormatted} (${usedRawFormatted} B)`;
  const unusedBytes = totalBytes - usedBytes;
  const unusedFormatted = formatSize(unusedBytes);
  const unusedRawFormatted = formatRawSize(unusedBytes);
  const unusedReport = `${unusedFormatted} (${unusedRawFormatted} B)`;
  const percentageFormatted = formatPercentage(percentage);

  return {
    report: {
      totalFormatted,
      totalReport,
      usedFormatted,
      usedReport,
      unusedFormatted,
      unusedReport,
      percentageFormatted
    },
    unusedBytes,
    ...details
  };
};

module.exports = {
  getDetailsSummary
};
