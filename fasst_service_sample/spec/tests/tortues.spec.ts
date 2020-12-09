import init from '@server';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { ITortue, tortue } from '@entities/Tortue';
import 'mocha';
import assert from 'assert';
import {StatusCodes} from 'http-status-codes';
import {prop, propEq} from 'ramda';

chai.use(chaiHttp);

const assertEquals = (objToCompare: any, objTarget: any, field: string) => {
	assert(
		propEq(
			field,
			prop(field, objTarget),
			objToCompare
		),
		`Invalid value for field ${field}`);
};

const assertStatus = (objToCompare: any, expectedStatus: number = StatusCodes.OK) => {
	assert(
		propEq(
			'status',
			expectedStatus,
			objToCompare
		),
		`Invalid status, expect ${expectedStatus}`);
};

const buildRequest = async (method: string, url: string, body?: any, expectedStatus: number = StatusCodes.OK) => {
	const app = await init();
	const request: ChaiHttp.Agent = chai.request(app);

	let response;
	switch (method) {
	case 'GET':
		response = await request.get(url);
		break;
	case 'POST':
		response = await request.post(url)
			.set('content-type', 'application/json')
			.send(body);
		break;
	case 'DELETE':
		response = await request.delete(url);
		break;
	case 'PUT':
		response = await request.put(url)
			.set('content-type', 'application/json')
			.send(body);
		break;
	default :
		response = await request.get(url);
		break;
	}
	assertStatus(response, expectedStatus);
	return response.body;
};

describe('hooks', async () => {
	const unknowMongoId = '5f8b37228af53026d8de9b8f';
	const firstTurtleId = '5fcf9a06abd5ed8684352436';
	const testTortues = [{
		'_id': firstTurtleId,
		'name': 'Toto',
		'age': 11,
		'taille': 19,
		'terrestre': false,
		'species': 'Trachemys scripta'
	},
	{
		'name': 'Tortilla',
		'age': 25,
		'taille': 150,
		'terrestre': true,
		'species': 'Testudo (Agrionemys) horsfieldii'
	}
	];

	const tortueToAdd = {
		'name': 'Bonny',
		'age': 1,
		'taille': 5,
		'terrestre': false,
		'species': 'Trachemys scripta'
	};

	beforeEach(async () => {
		// Connect to mongo db server
		await init();

		await tortue.deleteMany();
		await tortue.create(testTortues);
	});

	it('GET api/tortues all tortues', async () => {
		const data = await buildRequest('GET', '/api/tortues');

		assert(Array.isArray(data), 'les donnés retournés est un tableau');
		assert(data.length == testTortues.length, 'le nombre de tortues est correcte');
		data.forEach((value: ITortue, i: number) => {
			assert(value.name === testTortues[i].name, 'le nom de tortue est correcte');
			assert(value.age === testTortues[i].age, 'l\'age de tortue est correcte');
			assert(value.taille === testTortues[i].taille, 'la taille de tortue est correcte');
			assert(value.terrestre === testTortues[i].terrestre, 'l\'habitat de tortue est correcte');
			assert(value.species === testTortues[i].species, 'le species de tortue est correcte');
		});
	});

	it('POST api/tortues create tortue', async () => {
		const data = await buildRequest('POST', '/api/tortues/', tortueToAdd, StatusCodes.CREATED);

		assert('species' in data, 'l\'objet reçus est une tortue');
		assertEquals(tortueToAdd, data, 'name');
		assert(tortueToAdd.age === data.age, 'l\'age de tortue est correcte');
		assert(tortueToAdd.taille === data.taille, 'la taille de tortue est correcte');
		assert(tortueToAdd.terrestre === data.terrestre, 'l\'habitat de tortue est correcte');
		assert(tortueToAdd.species === data.species, 'le species de tortue est correcte');
	});

	it('GET api/tortues/:id get one tortue', async () => {
		const data = await buildRequest('GET', `/api/tortues/${firstTurtleId}`);

		assert('species' in data, 'l\'objet reçus est une tortue');
		assert(testTortues[0].name === data.name, 'le nom de tortue est correcte');
		assert(testTortues[0].age === data.age, 'l\'age de tortue est correcte');
		assert(testTortues[0].taille === data.taille, 'la taille de tortue est correcte');
		assert(testTortues[0].terrestre === data.terrestre, 'l\'habitat de tortue est correcte');
		assert(testTortues[0].species === data.species, 'le species de tortue est correcte');
	});

	it('GET api/tortues/:id get one tortue wrong id', async () => {
		await buildRequest('GET', `/api/tortues/${unknowMongoId}`, null, StatusCodes.NOT_FOUND);
	});

	it('DELETE api/tortues/:id delete tortue id correcte', async () => {
		await buildRequest('DELETE', `/api/tortues/${firstTurtleId}`);

		await buildRequest('GET', `/api/tortues/${firstTurtleId}`, null, StatusCodes.NOT_FOUND);
	});

	it('DELETE api/tortues delete tortue id erroné', async () => {
		await buildRequest('DELETE', `/api/tortues/${unknowMongoId}`, null, StatusCodes.NOT_FOUND);
	});

	it('PUT api/tortues/:id update tortue', async () => {
		await buildRequest('PUT', `/api/tortues/${firstTurtleId}`, tortueToAdd);

		const data = await buildRequest('GET', `/api/tortues/${firstTurtleId}`);

		assert(firstTurtleId === data._id, 'id de tortue est correcte');
		assert(tortueToAdd.name === data.name, 'le nom de tortue est correcte');
		assert(tortueToAdd.age === data.age, 'l\'age de tortue est correcte');
		assert(tortueToAdd.taille === data.taille, 'la taille de tortue est correcte');
		assert(tortueToAdd.terrestre === data.terrestre, 'l\'habitat de tortue est correcte');
		assert(tortueToAdd.species === data.species, 'le species de tortue est correcte');
	});

	it('PUT api/tortues/:id update tortue', async () => {
		await buildRequest('PUT', `/api/tortues/${unknowMongoId}`, tortueToAdd, StatusCodes.NOT_FOUND);
	});

});
