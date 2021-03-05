import fs from 'fs';
import { promisify } from 'util';
import express from 'express';

import { defaultConfig, validate } from './config.js';
import { getFolderAbsPath, getMocks } from './utils.js';

const readFile = promisify(fs.readFile);

const mockServer = () => {
  const config = {
    ...defaultConfig,
    ...process.env
  };

  validate(config);

  const { PORT, MOCKS_FOLDER, MOCK_EXTENSION } = config;
  const mocksFolderAbsPath = getFolderAbsPath(MOCKS_FOLDER);

  const app = express();

  app.listen(PORT, async () => {
    console.log(`Mock server is listening on port: ${PORT}...`);

    console.log(`Mocks are loaded from folder: ${mocksFolderAbsPath}`);

    const mockFiles = await getMocks({ folder: mocksFolderAbsPath, extension: MOCK_EXTENSION });

    if (!mockFiles?.length) {
      console.error('There are no mock files in the specified folder!');
      process.exit(1);
    }

    console.log(`Found mock files: [${mockFiles.join(', ')}]`);
    const mocks = await Promise.all(
      mockFiles.map((mockFilePath) => readFile(mockFilePath).then((buffer) => JSON.parse(buffer)))
    );
    console.log(mocks);
  });
};

export default mockServer;
