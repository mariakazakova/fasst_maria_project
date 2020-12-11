const R = require('ramda');
import moment from 'moment';

const formatDate = (date) => {

  const format = (template) => {
    if (!R.isNil(date)) return moment(date).format(template);
    return null;
  };
  const toDatetime = () => {
    return format('DD/MM/YYYY HH:mm:ss');
  };

  const toShortDatetime = () => {
    return format('DD/MM/YYYY HH:mm');
  };

  const toDate = () => {
    return format('DD/MM/YYYY');
  };

  const toShortDate = () => {
    return format('DD/MM/YY');
  };

  const toTime = () => {
    return format('HH:mm:ss');
  };

  const toShortTime = () => {
    return format('HH:mm');
  };

  const toUnix = () => {
    if (!R.isNil(date)) return moment(date).unix();
    return null;
  };

  return {
    toDatetime,
    toShortDatetime,
    toDate,
    toTime,
    toShortDate,
    toShortTime,
    toUnix
  };
};

const formatDateFromObj = (propName, obj) => {
  return formatDate(R.prop(propName, obj));
};

export {
  formatDate,
  formatDateFromObj
};