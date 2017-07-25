const debug = require('debug')('index');

debug('Started with params', process.argv);

if (process.argv.length <= 3) {
// TODO
  console.log(`
--------------------------------
instructions here
-----------
Use: 
$ node ./scripts/reduce.js destinationFolder file-1.geo.json file-2.geo.json ...
`);

  process.exit();
}

const params = require('./src/common/extract-params')(process.argv.slice(2));
require('./src')(params.geoJson, params.countries, params.flags, params.output, params.outputFlags, (err) => {
  if (err) throw err;
  console.log('Completed');
});
