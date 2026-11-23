export interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
  requestId?: string;
}

export interface ApiError {
  success: false;
  message: string;
  code: string;
  requestId?: string;
  details?: unknown;
}
