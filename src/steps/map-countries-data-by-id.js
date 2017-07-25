const debug = require('debug')('cgd-map-countries-data-by-id');

module.exports = (countriesData) => {
  debug('Started mapping of countries data by id');

  return countriesData.reduce((res, countryData) => {
    debug('mapped info', countryData.cca3);

    if (typeof countryData.cca3 !== 'string') {
      throw Error('Id not defined');
    }
    if (res[countryData.cca3] !== undefined) {
      throw Error('Id not unique');
    }

    // make sure all consistent uppercase
    // id used across data sets
    res[countryData.cca3.toLocaleUpperCase()] = {
      id: countryData.cca3,
      capital: countryData.capital,
      latlng: countryData.latlng,
      area: countryData.area,
      translations: countryData.translations
    };

    return res;
  }, {});
};
