const data = require('../data/zoo_data');
const { employees } = require('../data/zoo_data');

function isManager(id) {
  const idManager = employees.some((elemento) => elemento.managers.includes(id));
  return idManager;
}

function getRelatedEmployees(managerId) {
  if (isManager(managerId) === true) {
    const theEmployees = employees.filter((elemento) => elemento.managers.includes(managerId));
    const filterManager = theEmployees.reduce(
      (acc, curr) => acc.concat(
        (`${curr.firstName} ${curr.lastName}`),
      ), [],
    );
    return filterManager;
  }

  throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
}

module.exports = { isManager, getRelatedEmployees };
