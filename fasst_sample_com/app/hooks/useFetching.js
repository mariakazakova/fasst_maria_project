const R = require('ramda');
import { useState } from 'react';

const useFetching = (initialStatus = null, successCb, errorCb) => {
  const initialState = { status: initialStatus, error: null, payload: null };
  const [state, setState] = useState(initialState);

  return {
    reset: () => {
      setState(initialState);
    },
    start: () => {
      setState(R.assoc('status', 'fetching', initialState));
    },
    stop: (error = null, payload = null) => {
      if (R.isNil(error)) {
        if (R.is(Function, successCb)) successCb(payload);
        setState({ status: 'done', error, payload });
      } else {
        if (R.is(Function, errorCb)) errorCb(error);
        setState({ status: 'done', error, payload: null });
      }
    },
    statusIs: (status) => R.equals(status, R.prop('status', state)),
    statusIsNot: (status) => R.not(R.equals(status, R.prop('status', state))),
    isDone: () => R.propEq('status', 'done', state),
    isDoneWithError: () => R.propEq('status', 'done', state) && !R.isNil(R.prop('error', state)),
    isNotDone: () => R.not(R.propEq('status', 'done', state)),
    getError: () => R.prop('error', state),
    getStatus: () => R.prop('status', state),
    getPayload: () => R.prop('payload', state),
    isFetching: () => R.propEq('status', 'fetching', state)
  };
};

export default useFetching;