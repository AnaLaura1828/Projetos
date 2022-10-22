const data = require('../data/zoo_data');

const { species, hours } = data;
const keys = Object.keys(hours);

function weekDays(day) {
  const { open, close } = hours[day];
  const obj = {};
  if (day !== 'Monday') {
    obj[day] = {
      officeHour: `Open from ${open}am until ${close}pm`,
      exhibition: species.filter((elem) => elem.availability.includes(day))
        .map((param) => param.name),
    };
    return obj;
  }
  return {
    Monday: {
      officeHour: 'CLOSED',
      exhibition: 'The zoo will be closed!',
    },
  };
}

function getSchedule(scheduleTarget) {
  const animais = species.some(({ name }) => name === scheduleTarget);
  if (keys.includes(scheduleTarget)) {
    return weekDays(scheduleTarget);
  }
  if (!scheduleTarget || !animais) {
    return keys.reduce((acc, curr) => ({ ...acc, ...weekDays(curr) }), {});
  }
  const desestruturar = species.filter((param) => param.name === scheduleTarget);
  const [{ availability }] = desestruturar;
  return availability;
}
console.log(getSchedule('qualquercoisa'));
module.exports = getSchedule;

// tive ajuda da Raynara e o Daniel me auxiliou tambem
