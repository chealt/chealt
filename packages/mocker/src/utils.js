import path from 'path';
import glob from 'glob';
import fs from 'fs';
import { promisify } from 'util';

import logger from './logger.js';

const readFile = promisify(fs.readFile);

const globAsync = promisify(glob);

const getFolderAbsPath = (folder) => path.join(process.cwd(), folder);

const getMockFiles = ({ folder, extension }) => globAsync(`${folder}/**/*.${extension}`);

const getMocks = async ({ mocksFolderAbsPath, mockExtension }) => {
  logger.info(`Mocks are loaded from folder: ${mocksFolderAbsPath}`);

  const mockFiles = await getMockFiles({ folder: mocksFolderAbsPath, extension: mockExtension });

  if (!mockFiles?.length) {
    logger.error('There are no mock files in the specified folder!');
    process.exit(1); // eslint-disable-line no-process-exit
  }

  logger.info(`Found mock files: [${mockFiles.join(', ')}]`);

  return Promise.all(mockFiles.map((mockFilePath) => readFile(mockFilePath).then((buffer) => JSON.parse(buffer))));
};

const removePort = (url) => url.replace(/:\d\d\d\d[\d]*/gu, '');
const removeHost = (url) => url.replace(/https?:\/\/[^/]*/gu, '');

const findMocksForUrl = ({ isPortAgnostic, isHostAgnostic }) => (mocks, url) => {
  const mockKey = Object.keys(mocks).find((responseUrl) => {
    if (isPortAgnostic && isHostAgnostic) {
      return removeHost(removePort(responseUrl)) === removeHost(removePort(url));
    }

    if (isPortAgnostic) {
      return removePort(responseUrl) === removePort(url);
    }

    if (isHostAgnostic) {
      return removeHost(responseUrl) === removeHost(url);
    }

    return responseUrl === url;
  });

  if (mockKey) {
    return mocks[mockKey];
  }

  return undefined;
};

export { getFolderAbsPath, getMocks, findMocksForUrl };
