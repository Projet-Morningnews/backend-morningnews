// tests/index.test.js

const request = require('supertest');
const app = require('../app'); // Charge l'application Express

describe('Test de l\'API des articles', () => {
  it('devrait retourner une liste d\'articles', async () => {
    const response = await request(app).get('/articles');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('articles');
    expect(Array.isArray(response.body.articles)).toBe(true);
  });
});
