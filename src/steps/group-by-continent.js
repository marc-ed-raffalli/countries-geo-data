const debug = require('debug')('cgd-group-by-continent');

module.exports = dataById => {
  debug('Grouping data by continent');

  return Object.keys(dataById)
    .reduce((res, id) => {
      const data = dataById[id],
        continent = data.properties.continent;

      if (res[continent] === undefined) {
        res[continent] = [];
      }

      res[continent].push(data);

      return res;
    }, {});
};
