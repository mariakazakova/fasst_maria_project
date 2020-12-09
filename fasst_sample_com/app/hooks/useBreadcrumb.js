const R = require('ramda');

import useMatchLocation from './useMatchLocation';

const useBreadcrumb = (routes, defaultRoute) => {
  const {
    getParams,
    matchLocation
  } = useMatchLocation();
  for (let i = 0; i < routes.length; i++) {    
    const element = routes[i];
    if (!R.isNil(element) && matchLocation(element[0])) {
      const params = getParams(element[0]);
      return R.map(i => {
        if (R.is(Function, i)) return i(params);
        return i;
      })(element[1]);
    }
  }
  return [defaultRoute];
};

export default useBreadcrumb;