const debug = require('debug')('cgd-geoJsonify-continent-data');

module.exports = dataByContinent => {
  debug('GeoJsonify continent data');

  return Object.keys(dataByContinent)
    .reduce((res, id) => {
      res[id] = {
        type: 'FeatureCollection',
        features: dataByContinent[id]
      };
      return res;
    }, {});
};
