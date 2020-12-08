import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { turtleDao } from '@daos/Tortue/TortueDAO';

export const deleteTortue = async (req: Request, res: Response) => {
	try {
		const turtleId = req.params.id;
		await turtleDao.delete(turtleId);
		res.status(StatusCodes.OK).send();
	} catch (e) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: e.message });
	}
}
