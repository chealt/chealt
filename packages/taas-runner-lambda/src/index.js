const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');

const { cleanPuppeteerScript, streamToString } = require('./utils.js');

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

  const body = await streamToString(response.Body);
  const puppeteerScript = cleanPuppeteerScript(body);

  console.log(`Executing Puppeteer script: ${puppeteerScript}`);

  const { browser, page } = await eval(puppeteerScript); // eslint-disable-line no-eval

  await page.screenshot({ type: 'webp', fullPage: true });

  await browser.close();

  return {
    statusCode: 200
  };
};

module.exports = { handler };
