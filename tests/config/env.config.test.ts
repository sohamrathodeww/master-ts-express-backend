describe('environment configuration', () => {
  it('uses safe defaults in test environment', async () => {
    const { env } = await import('../../src/config/env.config');
    expect(env.PORT).toBeGreaterThan(0);
    expect(Array.isArray(env.CORS_ORIGINS)).toBe(true);
  });
});
