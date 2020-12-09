const R = require('ramda');
import qs from 'querystring';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const useUpdateQueryUrl = (newQueryFields) => {
  const history = useHistory();
  const location = useLocation();
  const queryFieldsRef = useRef();

  useEffect(() => {
    if (!R.equals(queryFieldsRef.current, newQueryFields)) {
      queryFieldsRef.current = newQueryFields;
      history.push(`${location.pathname}?${qs.encode(newQueryFields)}`);
    }
  });
  
};

export default useUpdateQueryUrl;
