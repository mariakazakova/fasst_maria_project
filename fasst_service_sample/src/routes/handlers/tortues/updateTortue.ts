import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { turtleDao } from '@daos/Tortue/TortueDAO';

export const updateTortue = async (req: Request, res: Response) => {
	try {
<<<<<<< Updated upstream
		const turtles = await turtleDao.update(req.body);
=======
		const turtles = await turtleDao.update(req.body, req.params.id);
>>>>>>> Stashed changes
		res.send(turtles);
	} catch (e) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: e.message });
	}
}
