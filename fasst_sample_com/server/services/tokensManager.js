import logger from '@thecodeisgreen/logger';
const R = require('ramda');
const tokens = require('./tokens');

const tokensManager = (serviceUrl, apiKey) => {
  let cachedTokens = null;

  const buildUrl = (route) => `${serviceUrl}${route}`;
  const refreshToken = () => R.prop('refresh_token', cachedTokens);

  const accessToken = async (refreshAccessToken = false) => {
    const getTokens = async (refreshAccessToken) => {
      return await tokens.get(
        buildUrl('/u/token'),
        apiKey,
        refreshAccessToken ? refreshToken() : undefined
      );
    };

    if (!refreshAccessToken && !R.isNil(cachedTokens)) return cachedTokens.access_token;
    try {
      cachedTokens = await getTokens(refreshAccessToken);
      return cachedTokens.access_token;
    } catch (err) {
      logger.error(`${err.stack}`);
      return null;
    }
  };

  return {
    accessToken,
    refreshToken
  };
};

module.exports = tokensManager;
