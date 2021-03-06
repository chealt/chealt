import logger from './logger.js';

const mockMiddleware = (req, res, next) => {
  logger.info(req);

  next();
};

export default mockMiddleware;
