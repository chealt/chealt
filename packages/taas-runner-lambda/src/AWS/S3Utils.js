const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const { streamToString } = require('../utils.js');

let client;

const save = ({ bucket, key, body, contentType }) => {
  console.log(`Saving file to: ${key}`);

  const putCommand = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: contentType
  });

  return client.send(putCommand);
};

const read = async ({ bucket, key }) => {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key
  });
  const response = await client.send(command);

  return streamToString(response.Body);
};

const init = ({ region }) => {
  client = new S3Client({
    region
  });

  return client;
};

module.exports = { init, read, save };
