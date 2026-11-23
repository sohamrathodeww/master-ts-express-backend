import request from 'supertest';
import { createApp } from '../src/app';

describe('GET /api/v1/health', () => {
  const app = createApp();

  it('returns a standardized successful health response', async () => {
    const response = await request(app).get('/api/v1/health').expect(200);
    expect(response.body).toMatchObject({
      success: true,
      message: 'Service is healthy',
      data: { status: 'ok' },
    });
    expect(response.headers['x-request-id']).toBeTruthy();
  });

  it('returns a standardized 404 response for unknown routes', async () => {
    const response = await request(app).get('/api/v1/does-not-exist').expect(404);
    expect(response.body).toMatchObject({ success: false, code: 'ROUTE_NOT_FOUND' });
  });
});
