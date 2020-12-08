import init from '@server';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { ITortue, tortue } from '@entities/Tortue';
import 'mocha';
import { assert } from 'console';

chai.use(chaiHttp);

describe('hooks', async () => {
    let request: ChaiHttp.Agent;
    const testTortues = [{
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
    ]

    const tortueToAdd = {
        'name': 'Bonny',
        'age': 1,
        'taille': 5,
        'terrestre': false,
        'species': 'Trachemys scripta'
    }

	before(async () => {
		const app = await init();
		request = chai.request(app);
	});

	beforeEach(async () => {
		await tortue.deleteMany();
		await tortue.create(testTortues[0]);
        await tortue.create(testTortues[1]);
	});

	it('GET api/tortues all tortues', async () => {
	    const response = await request.get('/api/tortues');
        const data = response.body;
        assert(Array.isArray(data), "data is returned as array");
        assert(data.length==testTortues.length, "number of tortles is correct");
        data.forEach((value: ITortue, i: number) => {
            assert(value.name===testTortues[i].name, "le nom de tortue est correcte");
            assert(value.age===testTortues[i].age, "l'age de tortue est correcte");
            assert(value.taille===testTortues[i].taille, "la taille de tortue est correcte");
            assert(value.terrestre===testTortues[i].terrestre, "l'habitat de tortue est correcte");
            assert(value.species===testTortues[i].species, "le species de tortue est correcte");
        });
    });

    it('POST api/tortues create tortue', async () => {
	    const response = await request.post('/api/tortues').set('content-type', 'application/json').send(tortueToAdd);
        const data = response.body;
        console.log("after post ", data);
    });
});
