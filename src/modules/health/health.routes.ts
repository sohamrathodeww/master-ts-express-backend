import { Router } from 'express';
import { sendSuccess } from '../../shared/utils/api-response.util';

export const healthRouter = Router();

healthRouter.get('/', (_req, res) => sendSuccess(res, 200, 'Service is healthy', {
  status: 'ok',
  timestamp: new Date().toISOString(),
}));
