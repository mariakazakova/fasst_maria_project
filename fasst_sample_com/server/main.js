import express from 'express';
import * as R from 'ramda';
import Moment from 'moment';
import version from './lib/version';
import routes from './routes';
import assert from 'assert';

import bodyParser from 'body-parser';
import path from 'path';
import session from 'express-session';
import { dbMongo } from './lib/options/dbMongo';
import authentication from './lib/options/authentication';
import checkEnvVars from './checkEnvVars';
import { initGraphQL } from './graphql';
import logger from '@thecodeisgreen/logger';

const initDb = async () => {
  await dbMongo.init(process.env.MONGO_DB_URL);
  await dbMongo.isReady();
};

const initApp = (app) => {
  const MongoStore = require('connect-mongo')(session);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers');
    next();
  });

  const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: Moment.duration(10, 'hours').asMilliseconds(),
    },
    store: new MongoStore({
      url: process.env.MONGO_DB_URL
    }),
    resave: true,
    saveUninitialized: true
  };

  if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
  }

  app.use(session(sess));

  return Promise.resolve();
};

const initOptions = async (app, server) => {
  await authentication.init(app, server);
  return Promise.resolve();
};

const initRoutes = (app) => {

  app.use('/', routes);
};

const initRoutesError = (app) => {
  app.use(function (err, req, res, next) {
    if (!err) return next();
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('invalid token...');
    } else {
      res.status(401).send(err.name);
    }
  });

  app.use((err, req, res, next) => {
    if (!err) return next();
    res.status(err.status || 500);
    res.render('app/error', {
      message: err.message,
      error: {}
    });
  });
};

const main = async () => {

  checkEnvVars();

  const app = express();
  const server = require('http').createServer(app);

  try {
    await initDb();
    await initApp(app, server);
    await initOptions(app, server);

    assert(!R.isNil(process.env.JWT_SECRET));

    initRoutes(app);
    initRoutesError(app);
    await initGraphQL(app, server);

    if (process.env.NODE_ENV === 'development') {
      const webpack = require('webpack');
      const webpackMerge = require('webpack-merge');
      const webpackDevMiddleware = require('webpack-dev-middleware');
      const webpackHotMiddleware = require('webpack-hot-middleware');
      const history = require('connect-history-api-fallback');

      const configDev = require('../webpack.dev.js');
      const config = webpackMerge(configDev);

      const compiler = webpack(config);

      app.use(history());
      app.use(webpackDevMiddleware(compiler));
      app.use(webpackHotMiddleware(compiler));
    } else {
      app.get ('*', (req, res) => {
        res.sendFile(path.join(process.cwd(), 'public', 'dist', 'index.html'));
      });
    }

    logger.info(version.toString(version.get()));

    (() => {
      const version = require('./lib/version');
      logger.info(version.toString(version.get()));
    })();

    server.listen(process.env.PORT, () => {
      logger.info(`server is ready on ${process.env.SERVICE_URL}`);
    });
  } catch (err) {
    logger.error(err.stack);
  }
};

module.exports = main;
