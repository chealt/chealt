const parseSQSBodyJSON = (SQSEvent) => {
  const messageBody = SQSEvent.Records[0].Body;

  console.log({ messageBody });

  return JSON.parse(messageBody);
};

const getAWSRegion = (SQSEvent) => SQSEvent.Records[0].awsRegion;

module.exports = { getAWSRegion, parseSQSBodyJSON };
