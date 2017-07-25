const debug = require('debug')('cgd-extract-params');

module.exports = (params) => {
  debug('Extracting parameters', params);

  return params.join(' ')
    .split('--')
    .reduce((res, param) => {
      if (param) {
        const split = param.split(' ');
        res[split[0]] = split[1] ? split[1] : true;
      }
      return res;
    }, {});
};
