import logger from './logger.js';

const mockMiddleware = (mocks) => (req, res) => {
  logger.info(req.originalUrl);

  const matchingMocks = [];

  mocks.forEach((mock) => {
    Object.keys(mock).forEach((testId) => {
      Object.keys(mock[testId]).forEach((url) => {
        if (url.includes(req.originalUrl)) {
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
      res.append(header, mock.headers[header]);
    });

    if (mock.headers['content-type'].includes('application/json')) {
      res.json(mock.body);
    } else {
      res.send(mock.body);
    }
  }
};

export default mockMiddleware;
