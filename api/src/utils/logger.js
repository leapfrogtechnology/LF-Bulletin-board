import winston, { format } from 'winston';
const LOG_LEVEL = 'debug';
/**
 * Create a new winston logger.
 */
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format:
        process.env.NODE_ENV === 'production'
          ? format.combine(format.timestamp(), format.json())
          : format.combine(format.colorize(), format.simple()),
      level: LOG_LEVEL
    })
  ]
});

export const logStream = {
  /**
   * A writable stream for winston logger.
   *
   * @param {any} message
   */
  write(message) {
    logger.info(message.toString());
  }
};
export default logger;
