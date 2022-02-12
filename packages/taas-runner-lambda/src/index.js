const puppeteer = require('puppeteer');
const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');

const { cleanPuppeteerScript, streamToString } = require('./utils.js');

const handler = async (event, context) => {
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

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--single-process']
  });

  const browserVersion = await browser.version();
  console.log(`Browser version: ${browserVersion}`);

  const page = await browser.newPage();
  page.setDefaultTimeout(30 * 1000); // 30 seconds

  await eval(puppeteerScript); // eslint-disable-line no-eval

  const screenshot = await page.screenshot({ type: 'webp', fullPage: true });

  await browser.close();

  const testName = Key.replace('.js', '');
  const putCommand = new PutObjectCommand({
    Bucket: 'puppeteer-lambda-screenshots',
    Key: `${testName}/${context.awsRequestId}/last-screen.webp`,
    Body: screenshot,
    ContentType: 'image'
  });
  await client.send(putCommand);

  return {
    statusCode: 200
  };
};

module.exports = { handler };
