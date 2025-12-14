const request = require('supertest');
const app = require('../backend/server');

describe("GET /api/destinations", () => {
  test("should return destinations array", async () => {
    const response = await request(app).get('/api/destinations');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
