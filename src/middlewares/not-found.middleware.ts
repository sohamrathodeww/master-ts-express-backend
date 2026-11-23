import type { Request, Response } from 'express';
import type { ApiError } from '../shared/types/api.types';

export function notFoundMiddleware(req: Request, res: Response<ApiError>): void {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
    code: 'ROUTE_NOT_FOUND',
    ...(res.locals.requestId ? { requestId: res.locals.requestId as string } : {}),
  });
}
