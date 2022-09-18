const formatSize = (size) => `${(size / 1024 / 1024).toFixed(2)} MB`;
const formatRawSize = (size) => new Intl.NumberFormat().format(size);
const formatPercentage = (percentage) =>
  new Intl.NumberFormat(undefined, { style: 'unit', unit: 'percent' }).format(
    percentage.toFixed(2)
  );
const formatSeconds = (seconds) =>
  new Intl.NumberFormat(undefined, { style: 'unit', unit: 'second' }).format(seconds);

const KBPerSec = {
  GG: 30,
  GGG: 50
};
const BPerSec = {
  GG: KBPerSec.GG * 1024,
  GGG: KBPerSec.GGG * 1024
};
const getDownloadTime = (size, speed) => {
  switch (speed) {
    case '2G':
      return size / BPerSec.GG;
    case '3G':
    default:
      return size / BPerSec.GGG;
  }
};
const getDetailsReport = (details) => {
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
  const timeSavingsGG = getDownloadTime(unusedBytes, '2G');
  const timeSavingsGGFormatted = formatSeconds(timeSavingsGG);
  const timeSavingsGGG = getDownloadTime(unusedBytes, '3G');
  const timeSavingsGGGFormatted = formatSeconds(timeSavingsGGG);

  return {
    report: {
      totalFormatted,
      totalReport,
      usedFormatted,
      usedReport,
      unusedFormatted,
      unusedReport,
      percentageFormatted,
      timeSavings: {
        GG: timeSavingsGG,
        GGFormatted: timeSavingsGGFormatted,
        GGG: timeSavingsGGG,
        GGGFormatted: timeSavingsGGGFormatted
      }
    },
    unusedBytes
  };
};

module.exports = {
  getDetailsReport
};
