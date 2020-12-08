import app from '@server';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { ITortue, tortue } from '@entities/Tortue';
import 'mocha';

chai.use(chaiHttp);

describe('hooks', async () => {

    beforeEach(async () => {
      await tortue.deleteMany({});
      await tortue.create({
            "name": "Toto",
            "age": 17,
            "taille": 19,
            "terrestre": false,
            "species": "Testudo (Agrionemys) horsfieldii"
        });
    });

    it('should return response on call', async () => {       
	    const res = await chai.request(app).get('/api/tortues');
	    console.log("my response", res);
	});
  
});
