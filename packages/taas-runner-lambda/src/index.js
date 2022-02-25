const puppeteer = require('puppeteer');
const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');

const { cleanPuppeteerScript, streamToString } = require('./utils.js');
const { getAWSRegion, parseSQSBodyJSON } = require('./SQSUtils.js');

const screenshotSaver =
  (client) =>
  ({ directory, filename, extension, buffer }) => {
    const screenshotKey = `${directory}/${filename}.${extension}`;

    console.log(`Saving screenshot to: ${screenshotKey}`);

    const putCommand = new PutObjectCommand({
      Bucket: 'puppeteer-lambda-screenshots',
      Key: screenshotKey,
      Body: buffer,
      ContentType: 'image'
    });

    return client.send(putCommand);
  };

const pageContentSaver =
  (client) =>
  async ({ directory, filename, extension, content }) => {
    const screenshotKey = `${directory}/${filename}.${extension}`;

    console.log(`Saving page content to: ${screenshotKey}`);

    const Body = await content;

    const putCommand = new PutObjectCommand({
      Bucket: 'puppeteer-lambda-screenshots',
      Key: screenshotKey,
      Body,
      ContentType: 'text/html'
    });

    return client.send(putCommand);
  };

const launchOptions = {
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--single-process']
};

const handler = async (event, context) => {
  const awsRegion = getAWSRegion(event);
  const { Bucket, Key, shouldTrace, shouldRecordContent, viewport } = parseSQSBodyJSON(event);
  const client = new S3Client({
    region: awsRegion
  });
  const command = new GetObjectCommand({
    Bucket,
    Key
  });
  const response = await client.send(command);

  const body = await streamToString(response.Body);
  const puppeteerScript = cleanPuppeteerScript({ script: body, cleanViewport: Boolean(viewport) });

  console.log(`Executing Puppeteer script: ${puppeteerScript}`);

  const browser = await puppeteer.launch(launchOptions);

  console.log(`Browser launched with options: ${JSON.stringify(launchOptions)}`);

  const browserVersion = await browser.version();
  console.log(`Browser version: ${browserVersion}`);

  const page = await browser.newPage();
  page.setDefaultTimeout(30 * 1000); // 30 seconds

  if (viewport) {
    page.setViewport(viewport);
  }

  const screenshotExtension = 'webp';
  let screenshotFilename = 'last-screen';
  const testName = Key.replace('.js', '');
  const timestamp = new Date().toISOString();
  const recordingDir = `${testName}/${timestamp}-${context.awsRequestId}`;
  const traceScreenshotPromises = [];

  if (shouldTrace) {
    page.on('load', () => {
      traceScreenshotPromises.push(page.screenshot({ type: screenshotExtension, fullPage: true }));
    });
  }

  const pageContentPromises = [];

  if (shouldRecordContent) {
    page.on('load', () => {
      pageContentPromises.push({
        url: page.url(),
        content: page.content()
      });
    });
  }

  try {
    await eval(puppeteerScript); // eslint-disable-line no-eval
  } catch {
    screenshotFilename = 'failure';
  }

  const screenshot = await page.screenshot({ type: screenshotExtension, fullPage: true });

  await browser.close();

  const saveScreenshot = screenshotSaver(client);

  if (shouldTrace) {
    const screenshots = await Promise.all(traceScreenshotPromises);
    await Promise.all(
      screenshots.map((buffer, index) =>
        saveScreenshot({
          directory: `${recordingDir}/trace`,
          filename: `trace-${index}`,
          extension: screenshotExtension,
          buffer
        })
      )
    );
  }

  const savePageContent = pageContentSaver(client);

  if (shouldRecordContent) {
    const pageContents = await Promise.all(pageContentPromises);

    await Promise.all(
      pageContents.map(({ url, content }) =>
        savePageContent({
          directory: `${recordingDir}/page-content`,
          filename: `${encodeURIComponent(url)}`,
          extension: 'html',
          content
        })
      )
    );
  }

  await saveScreenshot({
    directory: recordingDir,
    filename: screenshotFilename,
    extension: screenshotExtension,
    buffer: screenshot
  });

  return {
    statusCode: 200
  };
};

module.exports = { handler };
