const data = require('../data/zoo_data');

const { child: val1, adult: val3, senior: val2 } = data.prices; // destruturei cada valor

function countEntrants(entrants) {
  return entrants.reduce((acc, curr) => {
    if (curr.age < 50 && curr.age >= 18) acc.adult += 1;
    if (curr.age < 18) acc.child += 1;
    if (curr.age >= 50) acc.senior += 1;
    return acc;
  }, { child: 0, adult: 0, senior: 0 });
}

function calculateEntry(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) { return 0; }
  const { child, adult, senior } = countEntrants(entrants);
  return (child * val1) + (val3 * adult) + (val2 * senior);
}
module.exports = { calculateEntry, countEntrants };
