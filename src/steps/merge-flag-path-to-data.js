const debug = require('debug')('cgd-merge-flag-path-to-data.js');

module.exports = (mergedDataById, destinationFlagList) => {
  debug('Merging flag path to data');

  destinationFlagList.forEach(d => {
    if (mergedDataById[d.id] === undefined) {
      debug('Could not merge', d.id);
      return;
    }
    mergedDataById[d.id].properties.flag = d.dest;
  });

  return mergedDataById;
};
