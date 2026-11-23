import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { appConfig } from './config/app.config';
import { env } from './config/env.config';
import { corsOptions } from './config/cors.config';
import { logger } from './config/logger.config';
import { openApiDocument } from './docs/openapi';
import { errorMiddleware } from './middlewares/error.middleware';
import { notFoundMiddleware } from './middlewares/not-found.middleware';
import { requestIdMiddleware } from './middlewares/request-id.middleware';
import { apiRouter } from './routes';

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  if (env.TRUST_PROXY) app.set('trust proxy', 1);

  app.use(requestIdMiddleware);
  app.use(pinoHttp({ logger, autoLogging: { ignore: (req) => req.url === '/health/live' } }));
  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(express.json({ limit: '1mb', strict: true }));
  app.use(express.urlencoded({ extended: false, limit: '1mb' }));
  app.use(rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    limit: env.RATE_LIMIT_MAX,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests', code: 'RATE_LIMIT_EXCEEDED' },
  }));

  app.get('/health/live', (_req, res) => res.status(200).json({ status: 'alive' }));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));
  app.use(appConfig.apiPrefix, apiRouter);
  app.use(notFoundMiddleware);
  app.use(errorMiddleware);
  return app;
}
