const expect = require('chai').expect,
  mapFlagPath = require('./map-flag-source-path-to-destination');

describe('Map flag source path to destination', () => {

  function test(destPath, fileList, expected) {
    expect(mapFlagPath(destPath, fileList)).to.deep.equal(expected);
  }

  let mockFileList;

  beforeEach(() => {
    mockFileList = ['src/path/FOO.svg', 'src/path/BAR.svg'];
  });

  it('returns empty array with empty file list', () => test('dest/path', [], []));

  it('returns id, src, dest', () => test(
    'dest/path',
    mockFileList,
    [{
      id: 'FOO',
      src: 'src/path/FOO.svg',
      dest: 'dest/path/FOO.svg'
    }, {
      id: 'BAR',
      src: 'src/path/BAR.svg',
      dest: 'dest/path/BAR.svg'
    }]
  ));

  it('uppercase all destination file names', () => test(
    'dest/path',
    ['src/path/Foo.svg', 'src/path/bar.svg'],
    [{
      id: 'FOO',
      src: 'src/path/Foo.svg',
      dest: 'dest/path/FOO.svg'
    }, {
      id: 'BAR',
      src: 'src/path/bar.svg',
      dest: 'dest/path/BAR.svg'
    }]
  ));

  it('detects extension case insensitive', () => test(
    'dest/path',
    ['src/path/FOO.SVG', 'src/path/BAR.svg'],
    [{
      id: 'FOO',
      src: 'src/path/FOO.SVG',
      dest: 'dest/path/FOO.svg'
    }, {
      id: 'BAR',
      src: 'src/path/BAR.svg',
      dest: 'dest/path/BAR.svg'
    }]
  ));

});

