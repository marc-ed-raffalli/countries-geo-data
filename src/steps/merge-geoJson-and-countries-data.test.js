const expect = require('chai').expect,
  mapData = require('./merge-geoJson-and-countries-data');

describe('Merge geoJson and countries data', () => {

  const buildMockGeoJsonEntry = (id, name, continent, pop_est, lastcensus, geometry) => ({
      type: 'Feature',
      properties: {id, name, continent, pop_est, lastcensus},
      geometry
    }),
    buildMockCountryEntry = (id, capital, latlng, area, translations) => ({
      id, capital, latlng, area, translations
    });

  let fooCountryData, fooGeoJsonData,
    barCountryData, barGeoJsonData,
    fooGeom, barGeom
  ;

  beforeEach(() => {
    fooGeom = [[12, 13], [14, 15]];
    barGeom = [[22, 23], [24, 25]];

    fooCountryData = buildMockCountryEntry('FOO', 'Foo-capital', [1, 11], 111, {'fr': 'foo-fr'});
    barCountryData = buildMockCountryEntry('BAR', 'Bar-capital', [2, 22], 222, {'fr': 'bar-fr'});

    fooGeoJsonData = buildMockGeoJsonEntry('FOO', 'Foo-name', 'foo-cont', 10, 11, fooGeom);
    barGeoJsonData = buildMockGeoJsonEntry('BAR', 'Bar-name', 'bar-cont', 20, 21, barGeom);
  });

  it('skips entry when equivalent does not exists in geoJson data', () => {
    const countriesData = {
        FOO: fooCountryData,
        BAR: barCountryData
      },
      geoJsonData = {
        FOO: buildMockGeoJsonEntry('FOO', 'Foo-name', 'foo-cont', 10, 11, [[12, 13], [14, 15]])
      };

    expect(Object.keys(mapData(geoJsonData, countriesData))).to.deep.equal(['FOO']);
  });

  it('skips entry when equivalent does not exists in countries data', () => {
    const countriesData = {
        FOO: buildMockCountryEntry('FOO', 'Foo-capital', [1, 11], 111, {'fr': 'foo-fr'})
      },
      geoJsonData = {
        FOO: fooGeoJsonData,
        BAR: barGeoJsonData
      };

    expect(Object.keys(mapData(geoJsonData, countriesData))).to.deep.equal(['FOO']);
  });

  it('merges entries and outputs data', () => {
    const countriesData = {
        FOO: fooCountryData,
        BAR: barCountryData
      },
      geoJsonData = {
        FOO: fooGeoJsonData,
        BAR: barGeoJsonData
      };

    expect(mapData(geoJsonData, countriesData)).to.deep.equal({
      FOO: {
        type: 'Feature',
        properties: {
          id: 'FOO',
          name: 'Foo-name',
          continent: 'foo-cont',
          populationEstimate: 10,
          lastCensus: 11,
          capital: 'Foo-capital',
          latlng: [1, 11],
          area: 111,
          translations: {'fr': 'foo-fr'}
        },
        geometry: fooGeom
      },
      BAR: {
        type: 'Feature',
        properties: {
          id: 'BAR',
          name: 'Bar-name',
          continent: 'bar-cont',
          populationEstimate: 20,
          lastCensus: 21,
          capital: 'Bar-capital',
          latlng: [2, 22],
          area: 222,
          translations: {'fr': 'bar-fr'}
        },
        geometry: barGeom
      }
    });
  });

});

