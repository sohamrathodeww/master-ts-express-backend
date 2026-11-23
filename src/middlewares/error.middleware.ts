import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../shared/errors/app-error';
import type { ApiError } from '../shared/types/api.types';
import { logger } from '../config/logger.config';
import { env } from '../config/env.config';

export const errorMiddleware: ErrorRequestHandler = (error: unknown, _req, res, _next) => {
  let statusCode = 500;
  let code = 'INTERNAL_SERVER_ERROR';
  let message = 'An unexpected error occurred';
  let details: unknown;

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    code = error.code;
    message = error.message;
  } else if (error instanceof ZodError) {
    statusCode = 400;
    code = 'VALIDATION_ERROR';
    message = 'Request validation failed';
    details = error.issues.map(({ path, message: issueMessage }) => ({ path: path.join('.'), message: issueMessage }));
  } else if (error instanceof Error && error.message === 'CORS origin is not allowed') {
    statusCode = 403;
    code = 'CORS_ORIGIN_DENIED';
    message = 'Origin is not allowed';
  }

  logger.error({ err: error, statusCode, code, requestId: res.locals.requestId }, 'Request failed');
  const body: ApiError = {
    success: false,
    message,
    code,
    ...(res.locals.requestId ? { requestId: res.locals.requestId as string } : {}),
    ...(details && env.NODE_ENV !== 'production' ? { details } : {}),
  };
  res.status(statusCode).json(body);
};
