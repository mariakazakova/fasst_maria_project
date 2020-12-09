const R = require('ramda');
const nodeFetch = require('node-fetch');

const fetch2 = (() => {

  const send = ({ method, url, body = undefined, contentType }) => {
    return nodeFetch(
      url,
      {
        method,
        headers: { 'Content-Type': contentType },
        body: R.contains(method, ['PUT', 'POST']) ? JSON.stringify(body) : undefined
      }
    );
  };

  const handleResponse = async (response, stream = false) => {
    if (stream) return response.body;
    const json = await response.json();
    if (response.ok) {
      return json;
    } else {
      throw new Error(json.message);
    }
  };

  return {
    GET: async ({ url, contentType, stream }) => handleResponse(await send({
      method: 'GET', 
      url, 
      contentType
    }), stream),
    POST: async ({ url, body, contentType, stream }) => handleResponse(await send({
      method: 'POST', 
      url, 
      body, 
      contentType
    }), stream),
    PUT: async ({ url, body, contentType }) => handleResponse(await send({
      method: 'PUT', 
      url, 
      body,
      contentType
    })),
    DELETE: async ({ url }) => handleResponse(await send({
      method: 'DELETE', 
      url
    }))
  };
})();

module.exports = fetch2;