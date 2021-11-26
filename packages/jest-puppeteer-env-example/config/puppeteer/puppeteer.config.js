const { CI, DEBUG } = process.env;

module.exports = {
  launch: {
    devtools: Boolean(DEBUG),
    headless: Boolean(CI),
    slowMo: CI ? 0 : 10,
    args: ['--lang=en-US']
  },
  browserContext: 'incognito'
};
