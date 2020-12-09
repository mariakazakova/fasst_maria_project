const R = require('ramda');
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { QueryRenderer } from 'react-relay';

import environment from './index';

const {
  Alert,
  Spin
} = require('antd');

const _children = (
  children,
  props
) => {
  if (R.is(Function, children)) return children(props);
  return React.cloneElement(
    children,
    props
  );
};

const Cache = ({
  props,
  renderFetching,
  children
}) => {
  const [$props, setProps] = useState(null);

  useEffect(() => {
    if (!R.isNil(props) && R.isNil($props)) {
      setProps(props);
    } else if (!R.isNil(props) && !R.isNil($props) && !R.equals(props, $props)) {
      setProps(props);
    }
  }, [$props, props]);

  if (R.isNil($props)) return renderFetching;

  return _children(children, $props);

};

const Query = ({
  query,
  args,
  renderError,
  renderFetching,
  caching,
  children
}) => {
  return (
    <QueryRenderer
      lookup
      environment={environment()}
      query={query}
      variables={args}
      render={({ error, props }) => {
        if (error) return renderError(error);
        if (!caching) {
          if (R.isNil(props)) return renderFetching;
          return _children(children, props);
        } else {
          return (
            <Cache
              props={props}
              renderFetching={renderFetching}
            >
              {children}
            </Cache>
          );
        }
      }}
    />
  );
};

Query.defaultProps = {
  renderFetching: <Spin/>,
  renderError: function renderError (error) {
    return <Alert type="error" message={error} />;
  },
  caching: false
};

Query.propTypes = {
  query: PropTypes.object.isRequired,
  args: PropTypes.object,
  renderError: PropTypes.func.isRequired,
  renderFetching: PropTypes.object,
  caching: PropTypes.bool,
};

export default Query;