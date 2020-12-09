const R = require('ramda');
import validator from 'validator';

const emailIsValid = (email) => {
  if (R.isNil(email)) return false;
  if (R.is(Object, email)) email = R.propOr('', 'email', email);
  return validator.isEmail(email);
};

const passwordIsValid = (password, restrictedChains = []) => {
  if (R.isNil(password)) return false;
  if (R.is(Object, password)) password = R.propOr('', 'password', password);

  const tests = [];

  const hasRequiredLength = /^.{8,99}$/i;
  const hasAtLeastACharacter = /[a-z]+/i;
  const hasAtLeastANumber = /[0-9]+/;
  const hasAtLeastASymbol = /[-+=_)(*&^%$#@!~/?.>,<|\\]+/;
  tests.push(hasRequiredLength);
  tests.push(hasAtLeastACharacter);
  tests.push(hasAtLeastANumber);
  tests.push(hasAtLeastASymbol);
  if (restrictedChains.length > 0) {
    restrictedChains.map(restrictedChain => {
      const doesNotContainChain = new RegExp('^((?!' + restrictedChain + ').)*$', 'i');
      tests.push(doesNotContainChain);
    });
  }

  return tests.reduce((sum, regex) => sum && regex.test(password), true);

};

const phoneNumberIsValid = (phoneNumber) => {
  let reg = new RegExp('^0[1-9]([-. ]?[0-9]{2}){4}$');
  return reg.test(phoneNumber);
};

const contractNumberIsValid = (contractNumber) => {
  if (R.isNil(contractNumber)) return false;
  let regNumbers = new RegExp('^[A-Z0-9]+$');
  if (contractNumber.length !== 8) return false;
  return regNumbers.test(contractNumber.substr(0, 7)) && contractNumber.substr(7, 1) === 'P';
};

const contractNumbersAreUniques = (contractNumbers) => {
  if (R.isNil(contractNumbers)) return false;
  let values = [...new Set(contractNumbers)];
  if (values.length === 1 && R.isEmpty(values[0])) return true; // Cas où aucune valeur n'a encore été entrée
  return values.length === contractNumbers.length;
};

const nameIsValid = (text) => {
  if (R.isNil(text)) return false;
  let reg = new RegExp(/^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s-]+$/);
  return reg.test(text);
};

const rateIsValid = (rate) => {
  if (R.isNil(rate) || R.isEmpty(rate)) return false;

  const contains = (chars) => R.reduce((acc, char) => acc || R.contains(char)(rate), false)(chars);

  return !contains(['+', '-', 'e', '.', ',']) && rate >= 0 && rate <= 200;
};

const isNumeric = validator.isNumeric;

export {
  emailIsValid,
  passwordIsValid,
  phoneNumberIsValid,
  contractNumberIsValid,
  contractNumbersAreUniques,
  nameIsValid,
  rateIsValid,
  isNumeric
};