const R = require('ramda');
import React from 'react';

const populateChildren = (dataKey) => (children, childDataProp) => (data) => {
  if (R.isNil(children)) return null;
  data = R.prop(dataKey, data);
  if (R.is(Function, children)) return children(data);
  return React.cloneElement(
    children,
    {
      [R.when(R.isNil, R.always(dataKey), childDataProp)]: data
    }
  );
};

export {
  populateChildren
};