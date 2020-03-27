const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destory();
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: 'ONG ONG',
        email: 'contato@ong.com',
        whatsapp: '9458749888',
        city: 'São Paulo',
        uf: 'SP',
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
    expect(response.status).toBe(200);
  });
});
