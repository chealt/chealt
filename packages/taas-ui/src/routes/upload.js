import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const client = new S3Client({
  region: 'eu-central-1'
});

const bucket = 'puppeteer-scripts';

export const post = async ({ request }) => {
  const data = await request.formData();
  // File object: https://developer.mozilla.org/en-US/docs/Web/API/File
  const file = data.get('testScript');
  const fileBuffer = await file.arrayBuffer();
  const fileName = file.name;

  const putCommand = new PutObjectCommand({
    Bucket: bucket,
    Key: fileName,
    Body: fileBuffer,
    ContentType: 'text/javascript'
  });

  const filePath = `${bucket}/${fileName}`;

  console.log(`Saving Puppeteer script to ${filePath}`);

  await client.send(putCommand);

  console.log(`File saved to ${filePath}`);

  return {
    status: 200
  };
};
