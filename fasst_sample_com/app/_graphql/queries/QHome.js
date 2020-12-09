import React from 'react';
import { graphql } from 'react-relay';
import { Query } from '..';
import PropTypes from 'prop-types';
import {
  populateChildren
} from './toolbox';

const QHomeQuery = graphql`
  query QHomeQuery {
    homepage {
      id
      message
    }
  }
`;

const QHome = ({
  children,
}) => (
  <Query
    query={QHomeQuery}
    caching={false}
  >
    {populateChildren('homepage')(children)}
  </Query>
);

QHome.propTypes = {
  args: PropTypes.object
};


export default QHome;
