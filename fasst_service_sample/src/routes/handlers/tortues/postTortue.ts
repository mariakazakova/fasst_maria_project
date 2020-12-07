import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { turtleDao } from '@daos/Tortue/TortueDAO';

export const postTortue = async (req: Request, res: Response) => {
	try {
		const turtles = turtleDao.add(req.body);
		res.send(turtles);
	} catch (e) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: e.message });
	}
}