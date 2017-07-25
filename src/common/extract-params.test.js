const expect = require('chai').expect,
  extractParam = require('./extract-params');

describe('Extract Params', () => {

  function test(input, expected) {
    expect(extractParam(input)).to.deep.equal(expected);
  }

  it('extracts --key value pair', () => {
    test(['--keyA', 'valueA', '--keyB', 'valueB'], {keyA: 'valueA', keyB: 'valueB'});
  });

  it('extracts single --key and sets value to true', () => {
    test(['--keyA', '--keyB', 'valueB'], {keyA: true, keyB: 'valueB'});
    test(['--keyA', '--keyB'], {keyA: true, keyB: true});
  });

});

