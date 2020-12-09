import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { turtleDao } from '@daos/Tortue/TortueDAO';

export const updateTortue = async (req: Request, res: Response) => {
	try {
		const turtleId = req.params.id;
		const maybeTurtle = await turtleDao.getOne(turtleId);

		if (!maybeTurtle) {
			res.status(StatusCodes.NOT_FOUND).json({ error: `Turtle with id ${turtleId} not founded` });
			return;
		}

		const turtles = await turtleDao.update(req.body, turtleId);
		res.send(turtles);
	} catch (e) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: e.message });
	}
};
