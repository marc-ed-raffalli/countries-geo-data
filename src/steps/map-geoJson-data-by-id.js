const debug = require('debug')('cgd-map-geoJson-data-by-id'),
  validateId = id => {
    // isNaN(undefined) is true
    return id !== undefined && isNaN(id);
  };


module.exports = (data) => {
  debug('Started mapping geoJson data by id');

  return data.features.reduce((res, feature) => {
    const props = feature.properties,
      propId = ['iso_a3', 'adm0_a3'].find(d => validateId(props[d])),
      id = props[propId];

    debug('mapped info', id, props.name, props.continent);

    if (id === undefined) {
      throw Error('Id not defined');
    }
    if (res[id] !== undefined) {
      throw Error('Id not unique');
    }

    // make sure all consistent uppercase
    // id used across data sets
    res[id.toLocaleUpperCase()] = {
      type: feature.type,
      properties: {
        id: id,
        name: props.name,
        continent: props.continent,
        pop_est: props.pop_est,
        lastcensus: props.lastcensus
      },
      geometry: feature.geometry
    };

    return res;
  }, {});
};
