import supertest from 'supertest';
import { expect } from 'chai';

// This agent refers to PORT where program is runninng.

const server = supertest.agent('http://localhost:3000');

describe('Server API unit test', function(){

   it('should successfully login with correct account and password', function(done){

      server
      .post('/login')
      
      .expect('Content-Length', '15')
      .expect(200)
      .end()

   });
})