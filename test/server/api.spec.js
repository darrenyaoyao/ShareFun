const request = require('supertest-as-promised');
const app = require('../../server/app');
const expect = require('chai').expect;

describe('Server API unit test', () => {
  const p = new Promise((resolve) => setTimeout(() => resolve(request(app)), 5000));
  it('should successfully login with correct account and password', (done) => {
    p.then((res) =>
      res.post('/api/login')
        .send({
          username: 'admin',
          password: 'admin',
        })
        .expect(200)
      )
      .then((res) => {
        expect(res.body.success).to.be.true;
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        console.log('in error', err);
        done(err);
      });
  }).timeout(10000);
  it('should return err 3 for add user himself to be a friend', (done) => {
    p.then((res) =>
      res.post('/api/addfriend')
        .send({
          friendname: 'admin',
          username: 'admin',
        })
        .expect(200)
      )
      .then((res) => {
        expect(res.body.err).to.equal(3);
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        console.log('in error', err);
        done(err);
      });
  }).timeout(10000);
});
