const logger = require("./api/utils/logger")(__filename);
const app = require("./config/express.config");

app.listen(8080, (err) => {
  if (err) {
    return logger.error("server failed to start", err);
  }
  return logger.info(`my-gym-partner Proxy API started [env, port] = [8080]`);
});
