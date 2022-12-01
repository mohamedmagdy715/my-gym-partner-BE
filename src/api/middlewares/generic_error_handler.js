const httpStatus = require("http-status");
const logger = require("../utils/logger")(__filename);

const genericErrorHandler = (err, req, res, next) => {
  const responseStatus = err.status || httpStatus.INTERNAL_SERVER_ERROR;
  const response = {
    success: false,
    code: responseStatus,
    message: err.errorMessage || "Internal server error",
    errors: err.errors,
    timestamp: new Date().toISOString(),
    IP: req.ip,
    URL: req.originalUrl,
  };

  response.stack = err.stack;
  logger.error(err.message);
  res.status(responseStatus);
  res.send(response);
};

module.exports = genericErrorHandler;
