import type { Response } from 'express';
import type { ApiSuccess } from '../types/api.types';

export function sendSuccess<T>(res: Response, statusCode: number, message: string, data: T): Response<ApiSuccess<T>> {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    ...(res.locals.requestId ? { requestId: res.locals.requestId as string } : {}),
  });
}
