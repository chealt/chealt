export default {
  rootDir: '../',
  testEnvironment: 'node',
  transform: { '\\.js?$': ['babel-jest', { configFile: './config/babel.test.config.cjs' }] }
};
