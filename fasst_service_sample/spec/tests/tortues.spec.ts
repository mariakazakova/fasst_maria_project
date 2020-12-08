import init from '@server';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { tortue } from '@entities/Tortue';
import 'mocha';

chai.use(chaiHttp);

describe('hooks', async () => {
	let request: ChaiHttp.Agent;

	before(async () => {
		const app = await init();
		request = chai.request(app);
	});

	beforeEach(async () => {
		await tortue.deleteMany();
		await tortue.create({
			'name': 'Toto',
			'age': 17,
			'taille': 19,
			'terrestre': false,
			'species': 'Testudo (Agrionemys) horsfieldii'
		});
	});

	it('should return response on call', async () => {
	    const response = await request.get('/api/tortues');
		const body = response.body;
	    console.log('my response', body);
	});
});
