import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
// eslint-lint-disable-next-line import/no-unresolved
import credentials from '../components/AWS/config';

const get = async () => {
  const client = new S3Client({
    region: 'eu-central-1',
    credentials
  });
  const bucket = 'puppeteer-scripts';

  const listCommand = new ListObjectsV2Command({
    Bucket: bucket
  });

  const scripts = [];

  try {
    const response = await client.send(listCommand);

    scripts.push(...response.Contents.map(({ Key: path, LastModified: lastModified }) => ({ path, lastModified })));

    console.log(scripts);
  } catch (error) {
    console.error('Could not list Test Scripts');
    console.error(error);
  }

  return {
    body: {
      scripts
    }
  };
};

export { get };
