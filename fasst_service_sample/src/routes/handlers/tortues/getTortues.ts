import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { turtleDao } from '@daos/Tortue/TortueDAO';

export const getTortues = async (req: Request, res: Response) => {
	try {
		const turtles = await turtleDao.getAll();
		res.send(turtles);
	} catch (e) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: e.message });
	}
}
