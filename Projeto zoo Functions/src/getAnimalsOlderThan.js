const data = require('../data/zoo_data');
const { species } = require('../data/zoo_data');

function getAnimalsOlderThan(animal, age) {
  return species.find((animals) => animals.name === animal).residents.every(
    (idade) => idade.age >= age,
  );
}
module.exports = getAnimalsOlderThan;
