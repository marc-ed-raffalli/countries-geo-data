const debug = require('debug')('index');

debug('Started with params', process.argv);

if (process.argv.length <= 11) {
  console.log(`
Required parameters:
--geoJson     path/to/all.geojson
--countries   path/to/countries.json
--flags       path/to/svg/flags/
--output      dist
--outputFlags dist/flags

See README for more details
`);

  process.exit();
}

const params = require('./src/common/extract-params')(process.argv.slice(2));
require('./src')(params.geoJson, params.countries, params.flags, params.output, params.outputFlags, (err) => {
  if (err) throw err;
  console.log('Completed');
});
