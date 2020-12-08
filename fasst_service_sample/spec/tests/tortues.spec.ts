import app from '@server';
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);

describe('Get API Request', () => {
	it('should return response on call', async () => {
	    const res = await chai.request(app).get('/');
	    console.log(res);
	});
});
