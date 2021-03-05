import express from 'express';

import { defaultConfig, validate } from './config.js';

const mockServer = () => {
  const config = {
    ...defaultConfig,
    ...process.env
  };

  validate(config);

  const { PORT, MOCKS_FOLDER } = config;

  const app = express();

  app.listen(PORT, () => {
    console.log(`Mock server is listening on port: ${PORT}...`);

    console.log(`Mocks are loaded from folder: ${MOCKS_FOLDER}`);
  });
};

export default mockServer;
