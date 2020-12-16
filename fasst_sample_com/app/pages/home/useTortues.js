import React, { useState } from 'react';
import QTortlesMutation from '../../_graphql/mutations/QAddTortle';
import QUpdateTurtleMutation from '../../_graphql/mutations/QUpdateTurtle';
import { inc } from 'ramda';

export const useTortues = () => {
  const [key, setKey] = useState(0);

  const createTortue = async (data) => {

    QTortlesMutation({
      name: data.name,
      age: data.age,
      taille: data.taille,
      terrestre: data.terrestre === 'true',
      species: data.species
    }, (hasError, data) => {
      if (!hasError) {
        setKey(inc(key));
      }
    });
  };

  const updateTortue = async (data) => {
    QUpdateTurtleMutation({
      name: data.name,
      age: data.age,
      taille: data.taille,
      terrestre: data.terrestre === 'true',
      species: data.species,
      id: data.id
    }, (hasError, data) => {
      if (!hasError) {
        setKey(inc(key));
      }
    });
  };

  return { createTortue, updateTortue, key };
};
