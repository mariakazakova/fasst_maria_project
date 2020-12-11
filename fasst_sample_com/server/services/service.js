const R = require('ramda');
const assert = require('assert');
const fetch = require('./fetch2');
const S = require('string');
const qs = require('querystring');

const service = (serviceName, url, commands) => async (command, args) => {
  const buildUrl = (route) => `${url}${route}`;

  const getContentType = (command) => R.pathOr('application/json', [command, 'contentType'], commands);
  const getMethod = (command) => R.pathOr(null, [command, 'method'], commands);
  const getRoute = (command) => R.pathOr(null, [command, 'route'], commands);
  const getBody = (command) => R.pathOr([], [command, 'body'], commands);
  const getQuery = (command) => R.pathOr([], [command, 'query'], commands);
  const getStream = (command) => R.pathOr(false, [command, 'stream'], commands);

  const sanitizeKeys = (keys) => R.map(
    R.compose(
      R.when(v => v[0] === '-', v => S(v).chompLeft('-').s),
      R.when(R.is(Array), R.nth(0))
    )
  )(keys);

  const getMandatoryKeys = (keys) => {
    return sanitizeKeys(R.filter(
      v => {
        if (R.is(Array, v)) return v[1] === 'm';
        return v[0] !== '-';
      },
      keys
    ));
  };
  
  const getOptionalKeys = (keys) => {
    return sanitizeKeys(R.filter(
      v => {
        if (R.is(Array, v)) return v[1] === 'o';
        return false;
      },
      keys
    ));
  };
  
  const getUnwantedBodyKeys = (keys) => {
    return sanitizeKeys(R.filter(
      v => {
        if (R.is(String, v)) return v[0] === '-';
        return false;
      },
      keys
    ));
  };

  const buildBody = (command, args) => {
    return R.compose(
      R.omit(getUnwantedBodyKeys(getBody(command))),
      R.pick([...getMandatoryKeys(getBody(command)), ...getOptionalKeys(getBody(command))])
    )(args);
  };

  const buildQuery = (command, args) => {
    if (R.isEmpty(getQuery(command))) return [];
    return qs.stringify(
      R.compose(
        R.pick([...getMandatoryKeys(getQuery(command)), ...getOptionalKeys(getQuery(command))])
      )(args)
    );
  };

  const getParams = (str) => {
    let params = str.match(/:(\w+)/gi);
    if (R.isNil(params) || R.isEmpty(params)) return [];
    return R.map(v => S(v).chompLeft(':').s, params);
  };

  const populateParams = (str, args) => {
    const params = getParams(str, args);
    R.forEach(param => {
      assert(R.has(param, args), `${param} param value is not defined`);
      str = S(str).replaceAll(`:${param}`, args[param]).s;
    })(params);
    return str;
  };

  const checkArgs = (command, args) => {
    let keys = R.concat(getMandatoryKeys([...getBody(command), ...getQuery(command)]), getParams(getRoute(command)));
    let diff = R.difference(keys, R.keys(args));
    assert(R.isEmpty(diff), `warning : some args are not defined : ${JSON.stringify(diff)}`);
    keys = R.concat(keys, getOptionalKeys([...getBody(command), ...getQuery(command)]));
    diff = R.difference(R.keys(args), keys);
    assert(R.isEmpty(diff), `warning : some args are not used : ${JSON.stringify(diff)}`);
    return true;
  };

  assert(R.has(command, commands), `service ${serviceName}: command ${command} does not exist`);
  checkArgs(command, args);
  try {
    const url = buildUrl(populateParams(getRoute(command), args));
    const _STREAM_ = getStream(command);
    const _METHOD_ = getMethod(command);
    const _CONTENT_TYPE_ = getContentType(command);
    switch (_METHOD_) {
    case 'GET':
    case 'DELETE': {
      const withQueryString = (url, queryString) => {
        return R.when(
          R.compose(
            R.not,
            R.isNil
          ),
          queryString => `${url}?${queryString}`
        )(queryString);
      };
      return await fetch[_METHOD_]({
        url: withQueryString(url, buildQuery(command, args)), 
        stream: _STREAM_,
        contentType: _CONTENT_TYPE_
      });
    }
    case 'PUT': 
    case 'POST': {
      return await fetch[_METHOD_]({
        url, 
        body: buildBody(command, args), 
        stream: _STREAM_, 
        contentType: _CONTENT_TYPE_
      });
    }
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = service;