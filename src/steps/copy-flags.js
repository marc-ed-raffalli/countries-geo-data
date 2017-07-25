const debug = require('debug')('cgd-copy-flags'),
  series = require('async/series'),
  io = require('../common/io');

module.exports = (srcFlagList, next) => {
  debug('Copying flags');

  const flagCopies = srcFlagList.map(d => next => io.copy(d.src, d.dest, next));

  series(flagCopies, next);
};
