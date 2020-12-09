const R = require('ramda');
const fetch = require('node-fetch');
const btoa = require('btoa');

const tokens = (() => {
  const get = async (url, apiKey, refresh_token = undefined) => {

    const getBodyValues = (refresh_token) => {
      if (R.isNil(refresh_token)) {
        return ({ 
          grant_type: 'client_credentials' 
        });
      } else {
        return ({
          grant_type: 'refresh_token',
          refresh_token
        });
      }
    };
   
    const response = await fetch(
      url,
      {
        method: 'POST',
        body: JSON.stringify(getBodyValues(refresh_token)),
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Basic ' + btoa(apiKey),
          'Content-Type': 'application/json'
        }
      }
    );
    return await response.json();
  };

  return {
    get
  };
})();

module.exports = tokens;