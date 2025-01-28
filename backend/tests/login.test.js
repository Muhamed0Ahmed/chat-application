
const request = require('supertest');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { login } = require('../controllers/userControllers.js');
const User = require('../models/User.js');

const app = express();
app.use(express.json());
app.post('/login', login);

jest.mock('../models/User.js'); 
jest.mock('bcrypt'); // Mock bcrypt
jest.mock('jsonwebtoken'); // Mock jsonwebtoken

describe('POST /login', () => {
  it('should return 401 if email is invalid', async () => {
    User.findOne.mockResolvedValue(null); // Simulate user not found

    const response = await request(app)
      .post('/login')
      .send({ email: 'invalid@example.com', password: 'password' });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('invalid Email');
  });

  it('should return 401 if password is incorrect', async () => {
    const user = { _id: 'userId', email: 'test@example.com', password: 'hashedPassword' };
    User.findOne.mockResolvedValue(user); // Simulate user found
    bcrypt.compare.mockResolvedValue(false); // Simulate password mismatch

    const response = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'wrongPassword' });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });

  it('should return 200 and a token if login is successful', async () => {
    const user = { _id: 'userId', email: 'test@example.com', password: 'hashedPassword' };
    User.findOne.mockResolvedValue(user); // Simulate user found
    bcrypt.compare.mockResolvedValue(true); // Simulate password match
    jwt.sign.mockReturnValue('token'); // Mock token generation

    const response = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'correctPassword' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBe('token');
  });

  it('should return 500 if there is a server error', async () => {
    User.findOne.mockRejectedValue(new Error('Database error')); // Simulate server error

    const response = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'password' });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('catch error');
  });
});