// tests/connection.test.js

const mongoose = require('mongoose');

// Simule la connexion pour éviter de se connecter à une vraie base de données pendant les tests
jest.mock('mongoose', () => ({
  connect: jest.fn().mockResolvedValue(),
  connection: {
    on: jest.fn(),
  },
}));

describe('Test de la connexion à la base de données', () => {
  it('doit se connecter à MongoDB sans erreur', async () => {
    const connectionString = 'mongodb://localhost:27017/test';
    process.env.CONNECTION_STRING = connectionString;

    require('../models/connection'); // Charge le fichier connection.js

    // Vérifie que la fonction mongoose.connect a été appelée
    expect(mongoose.connect).toHaveBeenCalledWith(connectionString, { connectTimeoutMS: 2000 });
  });
});
