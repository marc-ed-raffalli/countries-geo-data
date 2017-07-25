const expect = require('chai').expect,
  mergeFlagPathToData = require('./merge-flag-path-to-data');

describe('Merge flag path to data', () => {

  function test(data, fileList, expected) {
    expect(mergeFlagPathToData(data, fileList)).to.deep.equal(expected);
  }

  let mockFileList, mockData;

  beforeEach(() => {
    mockFileList = [{
      id: 'FOO',
      src: 'src/path/FOO.svg',
      dest: 'dest/path/FOO.svg'
    }, {
      id: 'BAR',
      src: 'src/path/BAR.svg',
      dest: 'dest/path/BAR.svg'
    }];
    mockData = {
      FOO: {
        properties: {}
      },
      BAR: {
        properties: {}
      }
    };
  });

  it('does not throw when data is empty', () => {
    expect(() => mergeFlagPathToData({}, mockFileList)).to.not.throw();
  });

  it('does not throw when data does not have matching id', () => {
    expect(() => mergeFlagPathToData({
      BAZ: {
        properties: {}
      }
    }, mockFileList)).to.not.throw();
  });

  it('adds path to properties of matching feature', () => {
    test(mockData, mockFileList, {
      FOO: {
        properties: {
          flag: 'dest/path/FOO.svg'
        }
      },
      BAR: {
        properties: {
          flag: 'dest/path/BAR.svg'
        }
      }
    });
  });

});

