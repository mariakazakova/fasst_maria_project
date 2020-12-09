const R = require('ramda');
const assert = require('assert');
const Config = require('config');

const ApiKeys = (() => {

  let users = null;

  const init = () => {
    assert(!R.isNil(process.env.API_KEYS));
    const userList = R.split(',', process.env.API_KEYS);
    assert(!R.isEmpty(userList));
    let apiKeys = R.map((t) => {
      const regexp = /(\w+):(\w+):(\w+)/g;
      const result = regexp.exec(t);

      assert(R.is(Array, result), `Can not init Api Keys (${t})`);
      return ({
        clientId: result[1],
        secretKey: result[2],
        scope: result[3]
      });
    }, userList);

    apiKeys = R.concat(apiKeys, Config.get('apiKeys'));

    return apiKeys;
  };

  const findOne = (clientId, secretKey) => {

    if (R.isNil(users)) users = init();
    return Promise.resolve(R.find(
      v => R.and(
        R.propEq('clientId', clientId, v),
        R.propEq('secretKey', secretKey, v)
      ),
      users
    ));
  };

  return {
    init,
    findOne
  };
})();

module.exports = ApiKeys;
