import swPlugin from '@wmrjs/service-worker';

// Full list of options: https://wmr.dev/docs/configuration
export default (config) => {
  config.alias = {
    react: 'preact/compat',
    'react-dom': 'preact/compat'
  };

  swPlugin(config);
};
