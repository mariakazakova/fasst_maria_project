import fs from 'fs';
import path from 'path';
import { assoc, compose, dissoc, join, path as RPath, values } from 'ramda';
import tortues from '../../services/tortues';

const TortueResolver = () => (() => {
  const getAllTortles = async () => {
    try {
      return await tortues('getTortues');
    } catch (err) {
      return [];
    }
  };

  const getOneTortle = async id => {
    try {
      return await tortues('getOneTortue', { id });
    } catch (err) {
      return {};
    }
  };

  const createOneTortle = async (tortue) => {
    try {
      return await tortues('createTortue', tortue);
    } catch (err) {
      return {};
    }
  };

  const deleteOneTortle = async id => {
    try {
      return await tortues('deleteTortue', { id });
    } catch (err) {
      return {};
    }
  };

  const updateOneTortle = async (id, tortue) => {
    try {
      return await tortues('updateTortue', { ...tortue, id });
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