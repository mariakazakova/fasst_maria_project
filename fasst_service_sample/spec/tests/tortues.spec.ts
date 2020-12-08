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
        '_id': '5fcf9a06abd5ed8684352436',
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
    };

    beforeEach(async () => {
        const app = await init();
        request = chai.request(app);

        await tortue.deleteMany();
        await tortue.create(testTortues[0]);
        await tortue.create(testTortues[1]);
    });

    it('GET api/tortues all tortues', async () => {
        const response = await request.get('/api/tortues');
        const data = response.body;
        assert(Array.isArray(data), 'data is returned as array');
        assert(data.length == testTortues.length, 'number of tortles is correct');
        data.forEach((value: ITortue, i: number) => {
            assert(value.name === testTortues[i].name, 'le nom de tortue est correcte');
            assert(value.age === testTortues[i].age, 'l\'age de tortue est correcte');
            assert(value.taille === testTortues[i].taille, 'la taille de tortue est correcte');
            assert(value.terrestre === testTortues[i].terrestre, 'l\'habitat de tortue est correcte');
            assert(value.species === testTortues[i].species, 'le species de tortue est correcte');
        });
    });

    it('POST api/tortues create tortue', async () => {
        const response = await request.post('/api/tortues/')
            .set('content-type', 'application/json')
            .send(tortueToAdd);

        const data = response.body;
        assert('species' in data, 'l\'objet reçus est une tortue');
        assert(tortueToAdd.name === data.name, 'le nom de tortue est correcte');
        assert(tortueToAdd.age === data.age, 'l\'age de tortue est correcte');
        assert(tortueToAdd.taille === data.taille, 'la taille de tortue est correcte');
        assert(tortueToAdd.terrestre === data.terrestre, 'l\'habitat de tortue est correcte');
        assert(tortueToAdd.species === data.species, 'le species de tortue est correcte');
    });

    it('GET api/tortues/:id get one tortue', async () => {
        const response = await request.get('/api/tortues/'+testTortues[0]._id);
        const data = response.body;
        assert('species' in data, 'l\'objet reçus est une tortue');
        assert(testTortues[0].name === data.name, 'le nom de tortue est correcte');
        assert(testTortues[0].age === data.age, 'l\'age de tortue est correcte');
        assert(testTortues[0].taille === data.taille, 'la taille de tortue est correcte');
        assert(testTortues[0].terrestre === data.terrestre, 'l\'habitat de tortue est correcte');
        assert(testTortues[0].species === data.species, 'le species de tortue est correcte');
    });

    it('DELETE api/tortues delete tortue id correcte', async () => {
        const response = await request.delete('/api/tortues/'+testTortues[0]._id);
        assert(response.ok, 'suppression marche sans problèmes avec id correcte');
    });

    it('DELETE api/tortues delete tortue id erroné', async () => {
        const response = await request.delete('/api/tortues/123');
        assert(!response.ok, 'suppression ne marche pas avec id erroné');
    });

    it('PUT api/tortues update tortue', async () => {
        const response = await request.put('/api/tortues/'+testTortues[0]._id)
            .send(tortueToAdd);
        assert(!response.ok, 'reponse à suppression est ok');
        const app = await init();
        request = chai.request(app);
        const responseAfterUpdate = await request.get('/api/tortues/'+testTortues[0]._id);
        const data = responseAfterUpdate.body;
        assert(testTortues[0]._id === data._id, 'id de tortue est correcte');
        assert(tortueToAdd.name === data.name, 'le nom de tortue est correcte');
        assert(tortueToAdd.age === data.age, 'l\'age de tortue est correcte');
        assert(tortueToAdd.taille === data.taille, 'la taille de tortue est correcte');
        assert(tortueToAdd.terrestre === data.terrestre, 'l\'habitat de tortue est correcte');
        assert(tortueToAdd.species === data.species, 'le species de tortue est correcte');
    });

});
