
const R = require('ramda');

import {
  useLocation,
  matchPath,
} from 'react-router-dom';

const useMatchLocation = (options = { strict: false }) => {
  const location = useLocation();
  const matchLocation = (path) => {
    const match = matchPath(location.pathname, { path, ...options });
    return !R.isNil(match);
  };

  const getParams = (path) => {
    const match = matchPath(location.pathname, { path, ...options });
    if (R.isNil(match)) return null;
    return match.params;
  };

  return {
    getParams,
    matchLocation
  };
};

export default useMatchLocation;