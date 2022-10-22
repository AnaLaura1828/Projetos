const data = require('../data/zoo_data');
const { species } = require('../data/zoo_data');

function countAnimals(animal) {
  if (animal) {
    const obj = species.find(
      (elemento) => (!animal.specie || elemento.name === animal.specie),
    );
    const theResidents = obj.residents.filter(
      (elemento2) => (!animal.sex || elemento2.sex === animal.sex),
    ).length;
    return theResidents;
  }
  const obj2 = {};
  species.forEach((objs) => {
    obj2[objs.name] = objs.residents.length;
  });
  return obj2;
}

module.exports = countAnimals;
