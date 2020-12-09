import {
  useEffect,
  useRef,
  useState
} from 'react';

import {
  useLocation
} from 'react-router-dom';

import S from 'string';
import qs from 'querystring';

const useQueryUrl = () => {

  const search = S(useLocation().search).chompLeft('?').s;

  const [searchString, setSearchString] = useState(search);
  
  const searchRef = useRef(search);
  useEffect(() => {
    if (search == searchRef.current) return;
    searchRef.current = search;
    setSearchString(search);
  }, [search]);


  return qs.parse(searchString);
};

export default useQueryUrl;