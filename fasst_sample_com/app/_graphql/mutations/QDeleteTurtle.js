import React from 'react';
import { commitMutation, graphql } from 'react-relay';
import environment from '..';

const mutation = graphql`
  mutation QDeleteTurtleMutation(
                        $id: ID){
    deleteOneTortle(
      id: $id
    )
    {
      ok
    }
  }
`;

export default (args, done) => {
  const variables = {
    id: args.id
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
