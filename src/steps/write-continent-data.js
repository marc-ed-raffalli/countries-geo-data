const debug = require('debug')('cgd-write-continent-data'),
  series = require('async/series'),
  path = require('path'),
  io = require('../common/io');

module.exports = (dest, geoJsonDataById, next) => {
  debug('Write continent data');

  const continentsCopies = Object.keys(geoJsonDataById)
    .map(continent => next => {
      const fileName = continent.toLocaleLowerCase().replace(/(\s+)/g, '-');
      io.json.write(path.join(dest, fileName + '.json'), geoJsonDataById[continent], next);
    });

  series(continentsCopies, next);
};
