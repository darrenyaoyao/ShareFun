const request = require('supertest-as-promised');
const app = require('../../server/app');
const expect = require('chai').expect;

describe('Server API unit test', () => {
  it('should successfully login with correct account and password', (done) => {
    request(app)
      .post('/login')
      .send({
        username: 'admin',
        password: 'admin',
      })
      .expect(200)
      .expect((res) => {
        console.log('In test1');
        expect(res.status).to.equal(200);
        console.log('In test2');
        expect(res.body.success).to.be.true;
        console.log('In test3');
      })
      .then((res) => {
        console.log(res);
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
    console.log('Out test');
  });
});
