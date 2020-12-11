import React from 'react';
import { graphql } from 'react-relay';
import { Query } from '..';
import PropTypes from 'prop-types';
import {
  populateChildren
} from './toolbox';

const QTortlesQuery = graphql`
  query QTortlesQuery{
    getTortues {
        _id
        name
        age
        taille
        terrestre
        species
    }
  }
`;

const QTortles = ({
  children,
}) => (
  <Query
    query={QTortlesQuery}
    caching={false}
  >
    {populateChildren('getTortues')(children)}
  </Query>
);

QTortles.propTypes = {
  args: PropTypes.object
};


export default QTortles;