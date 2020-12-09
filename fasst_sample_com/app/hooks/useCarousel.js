const R = require('ramda');
import { useRef } from 'react';

const useCarousel = () => {
  var carousel = useRef(null);
  const onPrev = () => {
    carousel.current.prev();
  };

  const onNext = () => {
    carousel.current.next();
  };

  const onSetRef = (ref) => {
    if (!R.isNil(ref)) {
      carousel.current = ref;
    }
  };

  return {
    onSetRef,
    onNext,
    onPrev
  };
};

export default useCarousel;