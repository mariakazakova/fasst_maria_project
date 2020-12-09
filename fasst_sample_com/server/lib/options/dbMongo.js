const R = require('ramda');
const assert = require('assert');
const Promise = require('bluebird');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');
const { createModel } = require('mongoose-gridfs');
const logger = require('@thecodeisgreen/logger');

const Schemas = require('../../Schemas.js');

const getHandler = (collection) => {
  return dbMongo.useCollection(collection);
};

export const getBucketHandler = () => {

  const findOne = async (filename) => {
    const handler = await dbMongo.useBucket();
    return new Promise((resolve, reject) => {
      handler.findOne({ filename }, (error, file) => {
        if (error) return reject(error);
        if (R.isEmpty(file)) return reject(new Error('file not found'));
        return resolve(file);
      });
    });
  };

  const deleteFile = async (filename) => {
    const file = await findOne(filename);
    const handler = await dbMongo.useBucket();
    return new Promise((resolve, reject) => {
      try {
        handler.unlink(file._id, (error) => {
          if (error) return reject(error);
          return resolve();
        });
      } catch (error) {
        return resolve(error);
      }
    });
  };

  const readFile = async (filename) => {
    const handler = await dbMongo.useBucket();
    return new Promise((resolve, reject) => {
      handler.findOne({ filename }, (error, file) => {
        if (R.isNil(file)) {
          return reject(new Error(`file not found (${filename})`));
        }
        handler.read({ filename }, (error, buffer) => {
          if (error) return reject(error);
          return resolve(buffer.toString());
        });
      });
    });
  };

  const readFileStream = async (filename) => {
    const handler = await dbMongo.useBucket();
    return new Promise((resolve, reject) => {
      handler.findOne({ filename }, (error, file) => {
        if (R.isNil(file)) {
          logger.info(`******* ${filename}`);
          return reject(new Error(`file not found (${filename})`));
        }
        return resolve(handler.read({ filename }));
      });
    });
  };

  const saveFile = async (filepath, filename) => {
    const { createReadStream } = require('fs');
    const handler = await dbMongo.useBucket();
    return new Promise((resolve, reject) => {
      const readStream = createReadStream(filepath);
      const options = ({ filename });
      handler.write(options, readStream, (error, file) => {
        if (error) return reject(error);
        return resolve(file);
      });
    });
  };

  return {
    deleteFile,
    findOne,
    readFile,
    readFileStream,
    saveFile
  };
};

const dbMongo = (() => {
  const mongoose = require('mongoose');

  let context = { db: null, url: null };

  const dbIsNotOpened = R.compose(R.isNil, R.prop('db'));
  const getCollection = name => R.prop(name, Schemas);
  const getDb = R.prop('db');
  const setDb = R.assoc('db');
  const getBucket = R.prop('bucket');
  const setBucket = R.assoc('bucket');
  const setUrl = R.assoc('url');
  const getUrl = R.prop('url');

  const init = (url) => {
    context = setUrl(url)(context);
  };

  const connect = callback => {
    if (R.isNil(getUrl(context))) {
      return callback(null, 'PATH TO DATABASE NOT SET');
    }

    assert(!dbIsNotOpened(context), 'make sure isReady is called before calling connect');
    callback(getDb(context));
  };

  const useCollection = (collection) => {
    return new Promise((resolve, reject) => {
      connect((db, err) => {
        if (err) reject(err);
        if (R.is(String, collection)) {
          resolve(db.model(collection, Schemas[collection]));
        } else {
          resolve(db.model(collection, getCollection(collection)));
        }
      });
    });
  };

  const useBucket = () => {
    return new Promise((resolve, reject) => {
      connect((db, err) => {
        if (err) reject(err);
        resolve(getBucket(context));
      });
    });
  };

  const getModel = (collection) => {
    return mongoose.model(collection, getCollection(collection));
  };

  const isReady = async (options = { retry: true }) => {
    try {
      mongoose.Promise = require('bluebird');
      await mongoose.connect(getUrl(context), { useNewUrlParser: true, useUnifiedTopology: true });
      context = setDb(mongoose.connection)(context);
      context = setBucket(createModel())(context);
      logger.info(`database connection ok: ${context.url}`);
      return mongoose.connection;
    } catch (err) {
      logger.error(`database connection ko: ${context.url}, retry in 5 seconds`);
      if (R.propOr(true, 'retry', options)) {
        await Promise.delay(5000);
        return isReady();
      } else {
        throw err;
      }
    }
  };

  const initAutoIncrements = (list) => {
    return new Promise((fulfill) => {
      connect((db) => {
        MongooseAutoIncrementID.initialize(db);
        R.forEach(
          ({ collection, field }) => Schemas[collection].plugin(MongooseAutoIncrementID.plugin, { model: collection, field, startAt: 1, incrementBy: 1 })
        )(list);
        fulfill();
      });
    });
  };

  return {
    init,
    initAutoIncrements,
    isReady,
    useCollection,
    useBucket,
    getModel
  };
})();

module.exports = {
  dbMongo,
  getHandler,
  getBucketHandler
};
