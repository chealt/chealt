const transformPersonalDetails = (personalDetails) =>
  personalDetails.reduce(
    (mappedDetails, { key, value: { value } }) => ({
      ...mappedDetails,
      [key]: value
    }),
    {}
  );

export { transformPersonalDetails };
