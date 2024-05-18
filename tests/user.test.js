const request = require('supertest');
const app = require('../app');

describe('User API', () => {
  let token;

  beforeAll((done) => {
    request(app)
      .post('/auth/login')
      .send({
        email: 'admin',
        password: 'password',
      })
      .end((err, response) => {
        token = response.body.token; 
        done();
      });
  });

  test('GET /employees - success', async () => {
    const response = await request(app)
      .get('/employees')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test('GET /employees/:id - success', async () => {
    const response = await request(app)
      .get('/employees/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(1);
  });

  test('POST /employees - success', async () => {
    const response = await request(app)
      .post('/employees')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe',
        role: 'Employee',
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('User added!');
  });

  test('PUT /employees/:id - success', async () => {
    const response = await request(app)
      .put('/employees/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Mr X Updated',
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('User updated!');
  });

  test('DELETE /employees/:id - success', async () => {
    const response = await request(app)
      .delete('/employees/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('User deleted!');
  });
});
