import init from '@server';
import logger from '@shared/Logger';

const port = Number(process.env.PORT || 3000);
init().then(app =>
	app.listen(port, () => {
		logger.info('Express server started on port: ' + port);
	})
);
