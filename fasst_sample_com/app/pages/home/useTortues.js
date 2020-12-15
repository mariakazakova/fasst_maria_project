import React, { useState } from 'react';
import QTortlesMutation from '../../_graphql/mutations/QAddTortle';

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
        setKey(key + 1); //pas reussi à trouver de quel lib vient inc()
      }
    });
  };

  return { createTortue, key };
};
