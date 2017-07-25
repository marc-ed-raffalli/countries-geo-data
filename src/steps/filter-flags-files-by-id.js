const debug = require('debug')('cgd-filter-flags-files-by-id'),
  path = require('path');

module.exports = (mergedDataById, srcFlagList) => {
  debug('Filtering flags by id');

  return srcFlagList.filter(f => {
    // basename supports extension param
    // but it is case sensitive
    const ext = path.extname(f),
      id = path.basename(f, ext),
      // compare using uppercase
      // ids are all stored uppercase
      isInData = mergedDataById[id.toLocaleUpperCase()] !== undefined;

    debug(id, 'in data:', isInData, 'for file', f);
    return isInData;
  });
};
