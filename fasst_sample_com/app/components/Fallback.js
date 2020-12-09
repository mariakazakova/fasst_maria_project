import React from 'react';
import PropTypes from 'prop-types';

const Fallback = ({
  error,
  componentStack
}) => {
  return (
    <div style={{ padding: '1rem' }}>
      <p><strong>Oops! An error occured!</strong></p>
      <p>Here’s what we know…</p>
      <p><strong>Error:</strong> {error.toString()}</p>
      <p><strong>Stacktrace:</strong> {componentStack}</p>
    </div>
  );
};

Fallback.propTypes = {
  error: PropTypes.object.isRequired,
  componentStack: PropTypes.string.isRequired
};

export default Fallback;
