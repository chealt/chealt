import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

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

  console.log(response.Body.read());

  return {
    statusCode: 200
  };
};

export { handler };
