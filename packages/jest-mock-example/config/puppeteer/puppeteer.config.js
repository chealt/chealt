const { CI } = process.env;

module.exports = {
  launch: {
    headless: Boolean(CI),
    slowMo: CI ? 0 : 10
  },
  browserContext: 'incognito'
};
