const fetch = require('node-fetch');
const url = require('url');
// const { WebClient } = require('@slack/web-api');

const GET = async (pathname, query) => {
  const getUrl = url.format({
    host: 'https://slack.com',
    pathname,
    query
  });

  return fetch(getUrl);
};

const POST_MESSAGE = async (url, text) => {
  return fetch(url, { 
    method: 'POST', 
    body: JSON.stringify({ text }),
    headers: { 'Content-Type': 'application/json' }
  });
};

// let SLACK_ACCESS_TOKEN = 'xoxp-132391674263-131021848577-675035747575-3eaebd2369deb800f9e526e5d96257f4';

const slack = (() => {

  const codeToAccessToken = async (code) => {
    try {
      const response = await GET('/api/oauth.access', {
        client_id: process.env.SLACK_CLIENT_ID,
        client_secret: process.env.SLACK_CLIENT_SECRET,
        code
      });
      const json = await response.json();
      return json;
    } catch (err) {
      // console.log(err.stack);
    }
  };

  const postMessage = async (url, text = 'undefined') => {
    const response = await POST_MESSAGE(url, text);
    return await response.text();
  };

  return {
    codeToAccessToken,
    postMessage
  };
})();

module.exports = slack;