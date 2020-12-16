import React, { useState } from 'react';
import QTortlesMutation from '../../_graphql/mutations/QAddTortle';
import { inc } from 'ramda';

export const useTortues = () => {
  const [key, setKey] = useState(0);

  const createTortue = async (data) => {
    console.log("in use tortue, key : ", key)
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

  return { createTortue, key };
};
