import app from '@server';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Get API Request', () => {
  it('should return response on call', () => {
    return chai.request(app).get('/')
      .then(res => {
        console.log(res);
      })
  })
})