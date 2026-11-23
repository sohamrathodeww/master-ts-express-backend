export const openApiDocument = {
  openapi: '3.1.0',
  info: {
    title: 'Master 1 Express TypeScript API',
    version: '1.0.0',
    description: 'Versioned REST API foundation. Database and authentication endpoints are added in later phases.',
  },
  servers: [{ url: '/api/v1', description: 'Current API version' }],
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Check API health',
        responses: {
          '200': { description: 'Service is healthy' },
        },
      },
    },
  },
} as const;
