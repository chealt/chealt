const puppeteer = require('puppeteer');

const { cleanPuppeteerScript } = require('./utils.js');
const { getAWSRegion, parseSQSBodyJSON } = require('./SQSUtils.js');
const { read, save, init } = require('./AWS/S3Utils.js');

const launchOptions = {
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--single-process']
};

const saveScreenshot = ({ directory, filename, extension, buffer }) => {
  const key = `${directory}/${filename}.${extension}`;

  return save({ bucket: 'puppeteer-lambda-screenshots', key, body: buffer, contentType: 'image' });
};

const savePageContent = async ({ directory, filename, extension, pageContent }) => {
  const key = `${directory}/${filename}.${extension}`;

  const { content: contentPromise, ...rest } = pageContent;
  const content = await contentPromise;
  const body = JSON.stringify({
    content,
    ...rest
  });

  return save({ body, bucket: 'puppeteer-lambda-screenshots', key, contentType: 'application/json' });
};

const handler = async (event, context) => {
  const region = getAWSRegion(event);
  init({ region });

  const { Bucket, Key, shouldTrace, shouldRecordContent, viewport } = parseSQSBodyJSON(event);
  const script = read({ bucket: Bucket, key: Key });
  const puppeteerScript = cleanPuppeteerScript({ script, cleanViewport: Boolean(viewport) });

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

  if (shouldRecordContent) {
    const pageContents = await Promise.all(pageContentPromises);

    await Promise.all(
      pageContents.map((pageContent, index) =>
        savePageContent({
          directory: `${recordingDir}/page-content`,
          filename: `content-${index}`,
          extension: 'json',
          pageContent
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
