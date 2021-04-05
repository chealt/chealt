import logger from './logger.js';
import { findMocksForUrl } from './utils.js';

const findMocks = findMocksForUrl({ isPortAgnostic: true, isHostAgnostic: true });

const mockMiddleware = (allMocks) => (req, res, next) => {
  logger.debug(req.originalUrl);

  const matchingMocks = [];

  allMocks.forEach((suiteMocks) => {
    Object.keys(suiteMocks).forEach((testId) => {
      const testMocks = suiteMocks[testId];
      const mocksMatchingUrl = findMocks(testMocks, req.originalUrl);

      if (mocksMatchingUrl) {
        logger.debug(`Found mock for url: ${req.originalUrl}`);
        matchingMocks.push(mocksMatchingUrl);
      }
    });
  });

  if (matchingMocks.length) {
    const mock = matchingMocks[0][0];

    logger.debug(`Mock response: ${mock.body}`);

    res.status(mock.status);

    Object.keys(mock.headers).forEach((header) => {
      // all content will be plain text
      // so we don't send the content-encoding header
      if (header !== 'content-encoding') {
        res.append(header, mock.headers[header]);
      }
    });

    if (mock.headers['content-type'].includes('application/json')) {
      res.json(mock.body);
    } else {
      res.send(mock.body);
    }

    return;
  }

  next();
};

export default mockMiddleware;
