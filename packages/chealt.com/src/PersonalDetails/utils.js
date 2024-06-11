const findPersonalDetails = (personalDetails, selectedProfileId) =>
  personalDetails.length &&
  personalDetails.find((item) => item.key === selectedProfileId.value)?.value;

const getImperialUnitHeight = (metricHeight) => {
  const feet = metricHeight / 30.48;
  const feetFloor = Math.floor(feet);
  const inches = (feet - feetFloor) * 12;
  const inchesRounded = Math.round(inches);

  return `${feetFloor}'${inchesRounded}"`;
};

const getImperialUnitWeight = (metricWeight) => Math.floor(metricWeight / 0.454);

export { findPersonalDetails, getImperialUnitWeight, getImperialUnitHeight };
