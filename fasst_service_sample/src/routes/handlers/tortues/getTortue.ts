import {Request, Response} from 'express';
import { StatusCodes } from 'http-status-codes';
import {turtleDao}  from '@daos/Tortue/TortueDAO';

export const getTortue = async (req: Request, res: Response) => {
	try {
		const turtleId = req.params.id;
	   const maybeTurtle = turtleDao.getOne(Number(turtleId));
		
		if (!maybeTurtle) {
			res.status(StatusCodes.NOT_FOUND).json({error: `Turtle with id ${turtleId} not founded`});
			return;
		}
		
		res.send(maybeTurtle);
	} catch (e) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: e.message});	
	}
}