const expect = require('chai').expect,
  mapFlag = require('./filter-flags-files-by-id');

describe('Filter flag by Id', () => {

  function test(data, fileList, expected) {
    expect(mapFlag(data, fileList)).to.deep.equal(expected);
  }

  let mockFileList;

  beforeEach(() => {
    mockFileList = ['./dir/path/FOO.svg', './dir/path/BAR.svg', './dir/path/BAZ.svg'];
  });

  it('returns empty array with empty data', () => {
    test({}, mockFileList, []);
  });

  it('keeps only the flags with Id in data', () => {
    test(
      {
        FOO: {},
        BAR: {}
      },
      mockFileList,
      ['./dir/path/FOO.svg', './dir/path/BAR.svg']);
  });

  it('filters names case insensitive', () => {
    test(
      {
        FOO: {},
        BAR: {},
        BAZ: {}
      },
      ['./dir/path/foo.svg', './dir/path/Bar.svg', './dir/path/baz.SVG', './dir/path/boo.svg'],
      ['./dir/path/foo.svg', './dir/path/Bar.svg', './dir/path/baz.SVG']);
  });

});

