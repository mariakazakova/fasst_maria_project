import React from 'react';
import { commitMutation, graphql } from 'react-relay';
import { environment } from '..';
import PropTypes from 'prop-types';
import {
  populateChildren
} from '../queries/toolbox';

const mutation = graphql`
mutation QAddTortleMutation($name: String!,
                        $age: String,
                        $taille: String,
                        $terrestre: Boolean,
                        $species: String){
    createOneTortle(
      name: $name,
      age: $age,
      taille: $taille,
      terrestre: $terrestre,
      species: $species
    )
    {
      tortue {
        _id
        name
        age
        taille
        terrestre
        species
        }
    }
  }
`;

export default (args, done) => {
  const variables = {
    name: args.name,
    age: args.age,
    taille: args.taille,
    terrestre: args.terrestre,
    species: args.species
  };
  commitMutation(
    environment(),
    {
      mutation, // * Voir le GQL au dessus
      variables, // * Les variables definie,
      updater: (store, { createOneTortle }) => {},
      onCompleted: ({ createOneTortle }) => {
        done(false, createOneTortle);
      },
      onError: (err) => {
        done(true, err);
      }
    }
  );
};