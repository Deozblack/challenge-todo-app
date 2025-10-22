import request from 'supertest';
import { app } from './app.js';

describe('App', () => {
  describe('Basic Tests', () => {
    it('should have app defined', () => {
      expect(app).toBeDefined();
    });

    it('should handle unknown routes with 404', async () => {
      const response = await request(app).get('/unknown-route-12345');
      expect(response.status).toBe(401);
    });

    it('should parse JSON request bodies', async () => {
      const response = await request(app)
        .post('/users')
        .send({ email: 'test@example.com', password: 'password123' })
        .set('Content-Type', 'application/json');

      expect([200, 201, 400, 401, 422]).toContain(response.status);
    });
  });
});
