import pino from 'pino';
import { env } from './env.config';

export const logger = pino({
  level: env.LOG_LEVEL,
  redact: {
    paths: ['req.headers.authorization', 'req.headers.cookie', 'res.headers.set-cookie', '*.password', '*.token', '*.secret'],
    censor: '[REDACTED]',
  },
  base: { service: 'master-1-express-typescript-api', environment: env.NODE_ENV },
  timestamp: pino.stdTimeFunctions.isoTime,
});
