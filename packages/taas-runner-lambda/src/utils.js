const streamToString = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });

const lastCommand = 'await browser.close();';
const returnCommand = 'return { browser, page };';
const addReturn = (script) => script.replace(lastCommand, returnCommand);

const cleanPuppeteerScript = (script) => {
  let cleanScript = script;

  cleanScript = addReturn(cleanScript);

  return cleanScript;
};

module.exports = { cleanPuppeteerScript, streamToString };
