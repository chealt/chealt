const transformPersonalDetails = (personalDetails) =>
  personalDetails.reduce(
    (mappedDetails, { key, value: { value } }) => ({
      ...mappedDetails,
      [key]: value
    }),
    {}
  );

const getImperialUnitHeight = (metricHeight) => {
  const feet = metricHeight / 30.48;
  const feetFloor = Math.floor(feet);
  const inches = (feet - feetFloor) * 12;
  const inchesRounded = Math.round(inches);

  return `${feetFloor}'${inchesRounded}"`;
};

const getImperialUnitWeight = (metricWeight) => Math.floor(metricWeight / 0.454);

export { transformPersonalDetails, getImperialUnitWeight, getImperialUnitHeight };
