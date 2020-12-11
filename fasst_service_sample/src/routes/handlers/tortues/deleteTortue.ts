import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { turtleDao } from '@daos/Tortue/TortueDAO';

export const deleteTortue = async (req: Request, res: Response) => {
	try {
		const turtleId = req.params.id;

		const maybeTurtle = await turtleDao.getOne(turtleId);

		if (!maybeTurtle) {
			res.status(StatusCodes.NOT_FOUND).json({ error: `Turtle with id ${turtleId} not founded` });
			return;
		}

		const deletedId = await turtleDao.delete(turtleId);
		res.status(StatusCodes.OK).send({id: deletedId});
	} catch (e) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: e.message });
	}
};
