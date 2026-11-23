import { createApp } from './app';
import { env } from './config/env.config';
import { logger } from './config/logger.config';

const app = createApp();
const server = app.listen(env.PORT, env.HOST, () => {
  logger.info({ host: env.HOST, port: env.PORT }, 'API server started');
});

function shutdown(signal: string): void {
  logger.info({ signal }, 'Shutdown signal received');
  server.close((error) => {
    if (error) {
      logger.error({ err: error }, 'Error while closing HTTP server');
      process.exitCode = 1;
    }
  });
}

process.once('SIGTERM', () => shutdown('SIGTERM'));
process.once('SIGINT', () => shutdown('SIGINT'));
