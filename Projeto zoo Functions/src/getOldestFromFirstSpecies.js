const { employees, species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function getOldestFromFirstSpecies(id) {
  const idAnimal = employees.find((elem) => elem.id === id).responsibleFor[0];
  return Object.values(species.find((animal) => animal.id === idAnimal).residents
    .reduce((acc, curr) => {
      if (acc.age > curr.age) {
        return acc;
      }
      return curr;
    }));
}

module.exports = getOldestFromFirstSpecies;
// Carla me auxiliou a fazer
