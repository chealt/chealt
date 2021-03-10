import logger from './logger.js';

const mockMiddleware = (mocks) => (req, res, next) => {
  logger.info(req.originalUrl);

  const matchingMocks = [];

  mocks.forEach((mock) => {
    Object.keys(mock).forEach((testId) => {
      Object.keys(mock[testId]).forEach((url) => {
        if (url.endsWith(req.originalUrl)) {
          logger.info(req.originalUrl);
          matchingMocks.push(mock[testId][url]);
        }
      });
    });
  });

  if (matchingMocks.length) {
    const mock = matchingMocks[0][0];

    logger.info(mock.body);

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
