const data = require('../data/zoo_data');
const { species } = require('../data/zoo_data');

function getSpeciesByIds(...ids) {
  const animals = ids.reduce((acc, curr) => (acc.concat(species.find(
    (item) => item.id === curr,
  ))), []);
  return animals;
}

module.exports = getSpeciesByIds;
