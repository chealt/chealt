const streamToString = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });

const lastCommand = 'await browser.close();';
const returnCommand = 'return { page };';
const addReturn = (script) => script.replace(lastCommand, returnCommand);
const puppeteerLaunchCommand = 'const browser = await puppeteer.launch();';
const removeLaunch = (script) => script.replace(puppeteerLaunchCommand, '');
const newPageCommand = 'const page = await browser.newPage();';
const removeNewPage = (script) => script.replace(newPageCommand, '');
const setTimeoutCommand = 'page.setDefaultTimeout(timeout);';
const removeSetTimeout = (script) => script.replace(setTimeoutCommand, '');
const viewportSetCommand = /await targetPage.setViewport\(.*\)[;]?/u;
const removeViewportSet = (script) => script.replace(viewportSetCommand, '');

const cleanPuppeteerScript = ({ script, cleanViewport }) => {
  let cleanScript = script;

  cleanScript = removeLaunch(cleanScript);
  cleanScript = removeNewPage(cleanScript);
  cleanScript = removeSetTimeout(cleanScript);
  cleanScript = addReturn(cleanScript);

  if (cleanViewport) {
    cleanScript = removeViewportSet(cleanScript);
  }

  return cleanScript;
};

module.exports = { cleanPuppeteerScript, streamToString };
