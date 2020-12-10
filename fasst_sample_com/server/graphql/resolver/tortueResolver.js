const tortueService = require('../../services/tortues');
import { KO, OK } from './helpers';

const TortueResolver = () => (() => {

  const getAllTortles = async () => {
    try {
      return await tortueService('getTortues');
    } catch (err) {
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
      return await tortueService('createTortue', tortue);
    } catch (err) {
      return {};
    }
  };

  const deleteOneTortle = async id => {
    try {
      return await tortueService('deleteTortue', { id });
    } catch (err) {
      return {};
    }
  };

  const updateOneTortle = async (id, tortue) => {
    try {
      return await tortueService('updateTortue', { ...tortue, id });
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
})();

module.exports = TortueResolver;
