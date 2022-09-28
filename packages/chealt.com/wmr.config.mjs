import swPlugin from '@wmrjs/service-worker';
import htmlMinifier from 'rollup-plugin-html-minifier';

export default (config) => {
  config.alias = {
    react: 'preact/compat',
    'react-dom': 'preact/compat'
  };

  swPlugin(config);

  config.plugins.push(htmlMinifier({}));
};
