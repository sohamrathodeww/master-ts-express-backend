import { env } from './env.config';

export const appConfig = Object.freeze({
  name: 'Master 1 Express TypeScript API',
  apiPrefix: '/api/v1',
  environment: env.NODE_ENV,
  isProduction: env.NODE_ENV === 'production',
});
