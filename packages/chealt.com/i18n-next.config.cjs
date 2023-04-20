module.exports = {
  input: ['public/**/*.js'],
  output: './',
  options: {
    func: {
      list: ['t'],
      extensions: ['.js']
    },
    lngs: ['da', 'en-US', 'en-GB', 'hu', 'po'],
    defaultLng: 'en-US',
    resource: {
      loadPath: 'public/translation/{{lng}}.json',
      savePath: 'public/translation/{{lng}}.json'
    }
  }
};
