import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
// Puppeteer will be used by the loaded script
import puppeteer from 'puppeteer-core'; // eslint-disable-line no-unused-vars

import { streamToString } from './utils.js';

const handler = async (event) => {
  const { region, Bucket, Key } = event;
  const client = new S3Client({
    region
  });
  const command = new GetObjectCommand({
    Bucket,
    Key
  });
  const response = await client.send(command);

  const bodyContents = await streamToString(response.Body);
  console.log(bodyContents);

  return {
    statusCode: 200
  };
};

export { handler };
