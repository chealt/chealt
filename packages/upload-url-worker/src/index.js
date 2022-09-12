// import { parse } from 'cookie';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const getJSONResponse = (response, allowedOrigin) =>
  new Response(JSON.stringify(response), {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': allowedOrigin
    }
  });

export default {
  async fetch(request, env) {
    // TODO: check for device ID cookie
    // const cookieHeader = request.headers.get('Cookie');
    // const cookie = parse(cookieHeader || '');

    // if (!cookie.deviceID) {
    //   return new Response('Missing device ID', {
    //     status: 400
    //   });
    // }

    const { ACCOUNT_ID, ACCESS_KEY_ID, ACCESS_KEY_SECRET, ALLOWED_ORIGIN, BUCKET_NAME } = env;

    const client = new S3Client({
      region: 'us-east-1',
      endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: `${ACCESS_KEY_ID}`,
        secretAccessKey: `${ACCESS_KEY_SECRET}`
      },
      signatureVersion: 'v4'
    });
    const command = new PutObjectCommand({ Bucket: BUCKET_NAME, Key: crypto.randomUUID() });
    const url = await getSignedUrl(client, command, { expiresIn: 3600 });

    return getJSONResponse({ url }, ALLOWED_ORIGIN);
  }
};
