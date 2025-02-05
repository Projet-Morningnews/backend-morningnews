// tests/users.test.js

const request = require('supertest');
const app = require('../app'); // Charge l'application Express

describe('Test des routes utilisateurs', () => {

  // Test d'inscription d'un utilisateur
  it('devrait s\'inscrire avec succès', async () => {
    const newUser = { username: 'ahmed_gribi', password: 'password123' };

    const response = await request(app)
      .post('/users/signup')
      .send(newUser);

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(true);
    expect(response.body).toHaveProperty('token');
  });

  // Test d'inscription avec un utilisateur existant
  it('ne devrait pas s\'inscrire si l\'utilisateur existe déjà', async () => {
    const existingUser = { username: 'ahmed_gribi', password: 'password123' };

    // Crée d'abord l'utilisateur
    await request(app)
      .post('/users/signup')
      .send(existingUser);

    // Tente de créer le même utilisateur
    const response = await request(app)
      .post('/users/signup')
      .send(existingUser);

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(false);
    expect(response.body.error).toBe('User already exists');
  });

  // Test de connexion d'un utilisateur
  it('devrait se connecter avec succès avec les bonnes informations', async () => {
    const user = { username: 'ahmed_gribi', password: 'password123' };

    // Crée un utilisateur
    await request(app)
      .post('/users/signup')
      .send(user);

    // Teste la connexion
    const response = await request(app)
      .post('/users/signin')
      .send(user);

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(true);
    expect(response.body).toHaveProperty('token');
  });

  // Test de connexion avec des informations incorrectes
  it('ne devrait pas se connecter si l\'utilisateur ou le mot de passe est incorrect', async () => {
    const incorrectUser = { username: 'ahmed_gribi', password: 'wrongpassword' };

    const response = await request(app)
      .post('/users/signin')
      .send(incorrectUser);

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(false);
    expect(response.body.error).toBe('User not found or wrong password');
  });

  // Test de la vérification de la possibilité de "bookmark"
  it('devrait retourner true si l\'utilisateur peut ajouter des bookmarks', async () => {
    const newUser = { username: 'ahmed_gribi', password: 'password123' };
    const userResponse = await request(app)
      .post('/users/signup')
      .send(newUser);

    const response = await request(app)
      .get(`/users/canBookmark/${userResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body.result).toBe(true);
    expect(response.body.canBookmark).toBe(true);
  });

});
