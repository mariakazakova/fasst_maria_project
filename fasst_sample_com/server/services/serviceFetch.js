const R = require('ramda');
const assert = require('assert');
const fetch = require('./fetch');
const tokensManager = require('./tokensManager');

const serviceFetch = (serviceUrl, serviceApiKey) => {

  const tokens = tokensManager(serviceUrl, serviceApiKey);

  const buildUrl = (route) => `${serviceUrl}${route}`;

  const GET = async (route, refreshAccessToken = false) => {
    try {
      const response = await fetch.get(buildUrl(route), await tokens.accessToken(refreshAccessToken));
      assert(response.ok, R.pathOr(null, ['error', 'code'], response));
      return response.value;
    } catch (err) {
      if (err.message === 'access_token_is_expired' && !refreshAccessToken) {
        return await GET(route, true);
      }
    }
  };

  const POST = async (route, body, refreshAccessToken = false) => {
    try {
      const response = await fetch.post(buildUrl(route), body, await tokens.accessToken(refreshAccessToken));
      assert(response.ok, R.pathOr(null, ['error', 'code'], response));
      return response.value;
    } catch (err) {
      if (err.message === 'access_token_is_expired' && !refreshAccessToken) {
        return await POST(route, body, true);
      }
    }
  };

  const POST_FILE = async (route, documentType, filepath, refreshAccessToken = false) => {
    try {
      const response = await fetch.postFile(buildUrl(route), { documentType }, filepath, await tokens.accessToken(refreshAccessToken));
      assert(response.ok, R.pathOr(null, ['error', 'code'], response));
      return response.value;
    } catch (err) {
      if (err.message === 'access_token_is_expired' && !refreshAccessToken) {
        return await POST_FILE(buildUrl(route), documentType, filepath, true);
      }
    }
  };

  return {
    GET,
    POST,
    POST_FILE
  };
};

module.exports = serviceFetch;