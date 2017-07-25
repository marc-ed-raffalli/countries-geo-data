const debug = require('debug')('cgd-main'),
  waterfall = require('async/waterfall'),
  io = require('./common/io'),

  mapGeoJsonFeaturesById = require('./steps/map-geoJson-data-by-id'),
  mapCountriesDataById = require('./steps/map-countries-data-by-id'),
  mergeGeoJsonAndCountryData = require('./steps/merge-geoJson-and-countries-data'),
  filterFlagFilesById = require('./steps/filter-flags-files-by-id'),
  mapSourceFlagToDestinationPath = require('./steps/map-flag-source-path-to-destination'),
  copyFlags = require('./steps/copy-flags'),
  mergeFlagPathToData = require('./steps/merge-flag-path-to-data'),
  groupByContinent = require('./steps/group-by-continent'),
  geoJsonifyContinentData = require('./steps/geoJsonify-continent-data'),
  writeContinentDataFiles = require('./steps/write-continent-data')
;

/**
 * Data processor merging countries data and geoJson data into files grouped by continent name.
 *
 * Feature:
 * - Geometry
 * - Properties:
 *  - Country name
 *  - Capital city
 *  - Population & last census
 *  - Lat/Lng
 *  - Area in km²
 *  - Flag
 *
 * @param {String}   geoJsonDataPath:   Path to the file in the *geojson-regions* repository providing a collection of features
 * @param {String}   countriesDataPath: Path to the file in the *countries* repository providing the list of country data
 * @param {String}   flagsSrcDir:       Path to the flags directory in the *countries* repository
 * @param {String}   outputDir:         Path to the directory where to store the output data
 * @param {String}   flagDestDir:       Path to the directory where to store the flags
 * @param {Function} next:              Callback
 */
module.exports = (geoJsonDataPath, countriesDataPath, flagsSrcDir, outputDir, flagDestDir, next) => {
  debug('Started process');
  debug('args:', geoJsonDataPath, countriesDataPath, flagsSrcDir, outputDir, flagDestDir);

  waterfall([
    (next) => io.mkdirp(outputDir, next),
    (next) => io.mkdirp(flagDestDir, next),
    (next) => io.json.read(geoJsonDataPath, (err, data) => next(err, data)),
    (geoJsonData, next) => next(null, mapGeoJsonFeaturesById(geoJsonData)),

    (geoJsonDataById, next) => io.json.read(countriesDataPath, (err, countriesData) => next(err, geoJsonDataById, countriesData)),
    (geoJsonDataById, countriesData, next) => next(null, geoJsonDataById, mapCountriesDataById(countriesData)),

    (geoJsonDataById, countriesDataById, next) => next(null, mergeGeoJsonAndCountryData(geoJsonDataById, countriesDataById)),

    (mergedDataById, next) => io.listFiles(flagsSrcDir, {match: /\.svg$/i}, (err, path, flagList) => next(err, mergedDataById, flagList)),
    (mergedDataById, srcFlagList, next) => next(null, mergedDataById, filterFlagFilesById(mergedDataById, srcFlagList)),
    (mergedDataById, srcFlagList, next) => next(null, mergedDataById, mapSourceFlagToDestinationPath(flagDestDir, srcFlagList)),

    (mergedDataById, srcToDestFlagList, next) => copyFlags(srcToDestFlagList, err => next(err, mergedDataById, srcToDestFlagList)),
    (mergedDataById, destinationFlagList, next) => next(null, mergeFlagPathToData(mergedDataById, destinationFlagList)),

    (mergedDataById, next) => next(null, groupByContinent(mergedDataById)),
    (dataByContinent, next) => next(null, geoJsonifyContinentData(dataByContinent)),
    (geoJsonifiedDataByContinent, next) => writeContinentDataFiles(outputDir, geoJsonifiedDataByContinent, (err) => next(err, geoJsonifiedDataByContinent))

  ], next);
};
