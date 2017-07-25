const expect = require('chai').expect,
  geoJsonifyContinentData = require('./geoJsonify-continent-data');

describe('GeoJsonify continent data', () => {

  it('returns empty features on empty data', () => {
    expect(geoJsonifyContinentData({})).to.deep.equal({});
  });

  it('returns array of continents dest, data', () => {
    const fooData = [1, 2, 3];
    const barData = [4, 5, 6];

    expect(geoJsonifyContinentData({FOO: fooData, BAR: barData})).to.be.deep.equal({
      FOO: {
        type: 'FeatureCollection',
        features: fooData
      },
      BAR: {
        type: 'FeatureCollection',
        features: barData
      }
    });
  });

});

