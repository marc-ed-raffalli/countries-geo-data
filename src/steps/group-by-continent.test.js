const expect = require('chai').expect,
  groupByContinent = require('./group-by-continent');

describe('Group by continent', () => {

  const buildMockData = (continent, name) => ({properties: {name, continent}});

  it('returns empty object on empty data', () => {
    expect(groupByContinent({})).to.deep.equal({});
  });

  it('groups entries in arrays mapped by continent', () => {
    const foo = buildMockData('AAA', 'Foo'),
      bar = buildMockData('AAA', 'Bar'),
      baz = buildMockData('BBB', 'Baz'),
      data = {FOO: foo, BAR: bar, BAZ: baz};

    expect(groupByContinent(data)).to.deep.equal({
      AAA: [foo, bar],
      BBB: [baz]
    });
  });

});

