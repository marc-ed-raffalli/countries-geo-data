const expect = require('chai').expect,
  mapData = require('./map-geoJson-data-by-id');

describe('Map GeoJson data by id', () => {

  const buildFeatureCollection = features => ({features: features}),
    buildMockFeature = (id, name, continent, pop_est, lastcensus, geometry) => ({
      type: 'Feature',
      properties: {
        iso_a3: id.iso,
        adm0_a3: id.adm,
        name,
        continent,
        pop_est,
        lastcensus
      },
      geometry
    }),
    testSingleFeature = (id) => () => {
      const data = buildFeatureCollection([
        buildMockFeature(id, 'Name', 'cont', 10, 11, [[1, 2], [3, 4]])
      ]);

      expect(Object.keys(mapData(data))).to.deep.equal(['FOO']);
    };

  it('Falls back to adm0_a3 when iso_a3 is undefined', testSingleFeature({iso: undefined, adm: 'FOO'}));

  it('Falls back to adm0_a3 when iso_a3 is null', testSingleFeature({iso: null, adm: 'FOO'}));

  it('Falls back to adm0_a3 when iso_a3 is a number', testSingleFeature({iso: -99, adm: 'FOO'}));

  it('Falls back to adm0_a3 when iso_a3 is a string number', testSingleFeature({iso: '-99', adm: 'FOO'}));

  it('Stores id as uppercase', testSingleFeature({iso: 'foo'}));

  it('throws Error when id is not defined', () => {
    const data = buildFeatureCollection([
      buildMockFeature({iso: undefined, adm: -99}, 'Foo-name', 'foo-cont', 10, 11, [[12, 13], [14, 15]])
    ]);

    expect(() => mapData(data)).to.throw('Id not defined');
  });

  it('throws Error when id is not unique', () => {
    const data = buildFeatureCollection([
      buildMockFeature({iso: 'FOO'}, 'Foo-name', 'foo-cont', 10, 11, [[12, 13], [14, 15]]),
      buildMockFeature({iso: 'FOO'}, 'Bar-name', 'bar-cont', 20, 21, [[22, 23], [24, 25]])
    ]);

    expect(() => mapData(data)).to.throw('Id not unique');
  });

  it('extracts data: name, continent, popEst, lastCensus, geometry', () => {
    const fooGeom = [[12, 13], [14, 15]];
    const barGeom = [[22, 23], [24, 25]];
    const data = buildFeatureCollection([
      buildMockFeature({iso: 'FOO'}, 'Foo-name', 'foo-cont', 10, 11, fooGeom),
      buildMockFeature({iso: 'BAR'}, 'Bar-name', 'bar-cont', 20, 21, barGeom)
    ]);

    expect(mapData(data)).to.deep.equal({
      FOO: {
        type: 'Feature',
        properties: {
          id: 'FOO',
          name: 'Foo-name',
          continent: 'foo-cont',
          pop_est: 10,
          lastcensus: 11
        },
        geometry: fooGeom
      },
      BAR: {
        type: 'Feature',
        properties: {
          id: 'BAR',
          name: 'Bar-name',
          continent: 'bar-cont',
          pop_est: 20,
          lastcensus: 21
        },
        geometry: barGeom
      }
    });
  });

});

