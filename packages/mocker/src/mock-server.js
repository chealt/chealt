import express from 'express';

import { defaultConfig, validate } from './config.js';
import logger from './logger.js';
import mockMiddleware from './mockMiddleware.js';
import { getFolderAbsPath, getMocks } from './utils.js';

const mockServer = async () => {
  const config = {
    ...defaultConfig,
    ...process.env
  };

  validate(config);

  const app = express();

  app.use(/\/$/u, (req, res) => res.send(''));

  const { MOCKS_FOLDER, MOCK_EXTENSION } = config;
  const mocksFolderAbsPath = getFolderAbsPath(MOCKS_FOLDER);
  const mocks = await getMocks({ mocksFolderAbsPath, mockExtension: MOCK_EXTENSION });
  app.use(mockMiddleware(mocks));

  const { PORT } = config;
  app.listen(PORT, async () => {
    logger.info(`Mock server is listening on port: ${PORT}...`);
  });
};

export default mockServer;
