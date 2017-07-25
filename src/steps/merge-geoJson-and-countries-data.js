const debug = require('debug')('cgd-merge-countries-and-geoJson-data');

module.exports = (geoJsonDataById, countriesDataById) => {
  debug('Merging geoJson data and countries data');

  return Object.keys(geoJsonDataById)
    .reduce((res, geoJsonId) => {
      const cData = countriesDataById[geoJsonId],
        gData = geoJsonDataById[geoJsonId];

      if (cData !== undefined) {
        res[geoJsonId] = {
          type: gData.type,
          properties: {
            id: geoJsonId,
            name: gData.properties.name,
            continent: gData.properties.continent,
            populationEstimate: gData.properties.pop_est,
            lastCensus: gData.properties.lastcensus,
            capital: cData.capital,
            latlng: cData.latlng,
            area: cData.area,
            translations: cData.translations
          },
          geometry: gData.geometry
        };
      }
      else {
        debug('ignored', geoJsonId);
      }

      return res;
    }, {});
};
