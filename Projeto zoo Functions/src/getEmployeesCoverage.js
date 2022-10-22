const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

const { employees } = data;

function todos() {
  return employees.map((ele) => ({
    id: ele.id,
    fullName: `${ele.firstName} ${ele.lastName}`,
    species: ele.responsibleFor.map((param) => species.find((elem) => elem.id === param).name),
    locations: ele.responsibleFor.map((local) => species
      .find((elemento) => elemento.id === local).location),
  }));
}
function getEmployeesCoverage(obj) {
  if (!obj) { return todos(); }
  const teste = Object.values(obj)[0];
  const funcionarios = data.employees.find((elem) =>
    elem.id === teste || elem.firstName === teste || elem.lastName === teste);
  if (!funcionarios) {
    throw new Error('Informações inválidas');
  }
  return {
    id: funcionarios.id,
    fullName: `${funcionarios.firstName} ${funcionarios.lastName}`,
    species: funcionarios.responsibleFor.map((param) => species
      .find((elem) => elem.id === param).name),
    locations: funcionarios.responsibleFor.map((local) => species
      .find((elemento) => elemento.id === local).location),
  };
}

module.exports = getEmployeesCoverage;
// Lauro me auxiliou
