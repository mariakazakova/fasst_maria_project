import React from 'react';
import { commitMutation, graphql } from 'react-relay';
import environment from '..';

const mutation = graphql`
  mutation QUpdateTurtleMutation(
                        $name: String,
                        $age: String,
                        $taille: String,
                        $terrestre: Boolean,
                        $species: String,
                        $id: ID){
    updateOneTortle(
      name: $name,
      age: $age,
      taille: $taille,
      terrestre: $terrestre,
      species: $species,
      id: $id
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
    id: args.id,
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
      updater: (store, { updateOneTortle }) => {},
      onCompleted: ({ updateOneTortle }) => {
        done(false, updateOneTortle);
      },
      onError: (err) => {
        done(true, err);
      }
    }
  );
};
