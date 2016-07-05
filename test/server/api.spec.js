const request = require('supertest');
const app = require('../../server/app');
const expect = require('chai').expect;

// This agent refers to PORT where program is runninng.

describe('Server API unit test', () => {
  it('should successfully login with correct account and password', (done) => {
    request(app)
      .post('/login')
      .send({
        username: 'admin',
        password: 'admin',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.success).to.be.true;
        done();
      });
  });
});
