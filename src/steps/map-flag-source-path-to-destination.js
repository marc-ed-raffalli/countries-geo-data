const debug = require('debug')('cgd-map-flag-source-path-to-destination'),
  path = require('path');

module.exports = (distPath, srcFlagList) => {
  debug('Mapping flag source path to destination', distPath);

  return srcFlagList.map(src => {
    // basename supports extension param
    // but it is case sensitive
    const ext = path.extname(src),
      id = path.basename(src, ext).toLocaleUpperCase(),
      dest = path.join(distPath, id + ext.toLocaleLowerCase());

    return {id, src, dest};
  });
};
