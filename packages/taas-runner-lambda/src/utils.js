const streamToString = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });

const removePuppeteerRequire = (script) => script.replace("const puppeteer = require('puppeteer');", '');

const cleanPuppeteerScript = (script) => removePuppeteerRequire(script);

export { cleanPuppeteerScript, streamToString };
