const expect = require('chai').expect,
  mapData = require('./map-countries-data-by-id');

describe('Map countries data by id', () => {

  const buildMockCountryData = (id, capital, latlng, area, translations) => ({
    cca3: id,
    capital,
    latlng,
    area,
    translations
  });

  it('throws Error when id is not defined', () => {
    const data = [buildMockCountryData(undefined, 'capital', [1, 2], 123, {'fr': 'fr-foo'})];
    expect(() => mapData(data)).to.throw();
  });

  it('throws Error when id is not unique', () => {
    const data = [
      buildMockCountryData('FOO', 'foo-capital', [1, 11], 111, {'fr': 'foo-fr'}),
      buildMockCountryData('FOO', 'bar-capital', [2, 22], 222, {'fr': 'bar-fr'})
    ];
    expect(() => mapData(data)).to.throw();
  });

  it('Stores id as uppercase', () => {
    const data = [
      buildMockCountryData('foo', 'foo-capital', [1, 11], 111, {'fr': 'foo-fr'})
    ];
    expect(Object.keys(mapData(data))).to.deep.equal(['FOO']);
  });

  it('extracts data: capital, latlng, area, translations', () => {
    const data = [
      buildMockCountryData('FOO', 'foo-capital', [1, 11], 111, {'fr': 'foo-fr'}),
      buildMockCountryData('BAR', 'bar-capital', [2, 22], 222, {'fr': 'bar-fr'})
    ];
    expect(mapData(data)).to.deep.equal({
      FOO: {
        id: 'FOO',
        capital: 'foo-capital',
        latlng: [1, 11],
        area: 111,
        translations: {'fr': 'foo-fr'}
      },
      BAR: {
        id: 'BAR',
        capital: 'bar-capital',
        latlng: [2, 22],
        area: 222,
        translations: {'fr': 'bar-fr'}
      }
    });
  });

});

