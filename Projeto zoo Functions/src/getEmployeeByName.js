const data = require('../data/zoo_data');
const { employees } = require('../data/zoo_data');

function getEmployeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  const nameEmployee = employees
    .find((people) => people.lastName === employeeName || people.firstName === employeeName);
  return nameEmployee;
}
getEmployeeByName();
module.exports = getEmployeeByName;
