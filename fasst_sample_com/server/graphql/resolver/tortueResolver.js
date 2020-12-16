const tortueService = require('../../services/tortues');
import { KO, OK } from './helpers';

const TortueResolver = () => {

  const getAllTortles = async () => {
    try {
      const response = await tortueService('getTortues');
      return response;
    } catch (err) {
      console.error(err);
      return KO(err);
    }
  };

  const getOneTortle = async id => {
    try {
      return await tortueService('getOneTortue', { id });
    } catch (err) {
      return {};
    }
  };

  const createOneTortle = async (tortue) => {
    try {
      const response = await tortueService('createTortue', tortue);
      return OK({ tortue: response });
    } catch (err) {
      return {};
    }
  };

  const deleteOneTortle = async (id) => {
    try {
      await tortueService('deleteTortue', { id: id });
      return OK();
    } catch (er) {
      return {};
    }
  };

  const updateOneTortle = async (tortue, id) => {
    try {
      console.log("in update tortue", tortue);
      console.log("in update id", id);
      const response = await tortueService('updateTortue', { ...tortue, id });
      console.log("response in update ", response);
      return OK({ tortue: response });
    } catch (err) {
      return {};
    }
  };

  return {
    getAllTortles,
    getOneTortle,
    createOneTortle,
    deleteOneTortle,
    updateOneTortle
  };
};

module.exports = TortueResolver;
