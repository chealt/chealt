import express from 'express';

import { defaultConfig, validate } from './config.js';
import logger from './logger.js';
import { getFolderAbsPath, getMocks } from './utils.js';
import mockMiddleware from './mockMiddleware.js';

const mockServer = async () => {
  const config = {
    ...defaultConfig,
    ...process.env
  };

  validate(config);

  const { PORT, MOCKS_FOLDER, MOCK_EXTENSION } = config;
  const mocksFolderAbsPath = getFolderAbsPath(MOCKS_FOLDER);

  const app = express();

  const mocks = await getMocks({ mocksFolderAbsPath, mockExtension: MOCK_EXTENSION });

  app.use('/', (req, res) => res.send(''));

  app.use(mockMiddleware(mocks));

  app.listen(PORT, async () => {
    logger.info(`Mock server is listening on port: ${PORT}...`);
  });
};

export default mockServer;
