import fs from 'fs';
import { promisify } from 'util';
import IBM from 'ibm-cos-sdk';

const readFile = promisify(fs.readFile);

const validateConfig = ({ bucket, endpoint, apiKeyId, serviceInstanceId }) => {
  if (!endpoint) {
    throw new Error('IBM Cloud Provider `endpoint` must be provided!');
  }

  if (!apiKeyId) {
    throw new Error('IBM Cloud Provider `apiKeyId` must be provided!');
  }

  if (!serviceInstanceId) {
    throw new Error('IBM Cloud Provider `serviceInstanceId` must be provided!');
  }

  if (!bucket) {
    throw new Error('IBM Cloud Provider `bucket` must be provided!');
  }
};

const getKey = ({ git: { org, repo, branch, hash }, file }) =>
  `${org}/${repo}/${branch}/${hash}/${file}`;

const uploadFiles = ({ config: { endpoint, apiKeyId, serviceInstanceId, bucket }, files, git }) => {
  const cos = new IBM.S3({
    endpoint,
    apiKeyId,
    serviceInstanceId
  });

  return Promise.all(
    files.map(async (file) => {
      const content = await readFile(file);
      const key = getKey({ git, file });

      return cos
        .putObject({
          Bucket: bucket,
          Key: key,
          Body: content
        })
        .promise()
        .then(() => {
          console.log(`Coverage file uploaded to: ${key}`); // eslint-disable-line no-console
        })
        .catch((error) => {
          console.error(`ERROR: ${error.code} - ${error.message}\n`); // eslint-disable-line no-console
        });
    })
  );
};

const getCoverageSummary = async ({
  config: { endpoint, apiKeyId, serviceInstanceId, bucket },
  git,
  file
}) => {
  const cos = new IBM.S3({
    endpoint,
    apiKeyId,
    serviceInstanceId
  });

  const key = getKey({ git, file });

  const object = await cos.getObject({ Bucket: bucket, Key: key }).promise();

  if (!object || !object.Body) {
    throw new Error(`The specified object does not exist: ${key} in the bucket: ${bucket}`);
  }

  return Buffer.from(object.Body);
};

export { getCoverageSummary, uploadFiles, validateConfig };
