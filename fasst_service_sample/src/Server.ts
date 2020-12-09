import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';

import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

import BaseRouter from './routes';
import logger from '@shared/Logger';
import mongoose from 'mongoose';
import {pathOr} from 'ramda';

const app = express();
const { BAD_REQUEST } = StatusCodes;



const init = async () => {

	/************************************************************************************
	 *                              Set basic express settings
	 ***********************************************************************************/
	const mongoDBUrl = pathOr('mongodb://localhost:27017/tortues', ['env', 'MONGO_DB_URL'], process);
	await mongoose.connect(mongoDBUrl,  { useNewUrlParser: true, useUnifiedTopology: true });

	console.log(`Connected at ${mongoDBUrl} !!!!!`);
	app.use(express.json());
	app.use(express.urlencoded({extended: true}));
	app.use(cookieParser());

	// Add APIs
	app.use('/api', BaseRouter);

	// Print API errors
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		logger.err(err, true);
		return res.status(BAD_REQUEST).json({
			error: err.message,
		});
	});



	/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

	const viewsDir = path.join(__dirname, 'views');
	app.set('views', viewsDir);
	const staticDir = path.join(__dirname, 'public');
	app.use(express.static(staticDir));
	app.get('*', (req: Request, res: Response) => {
		res.sendFile('index.html', {root: viewsDir});
	});

	// Export express instance
	return app;
};

export default init;
