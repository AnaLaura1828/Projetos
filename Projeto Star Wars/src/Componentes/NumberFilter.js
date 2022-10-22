import React, { useContext, useState } from 'react';
import MyContext from '../Hooks/Context';

function NumberFilter() {
  const { handleSelect, filterByNumericValues,
    filterData, setFilterData, setFilterByNumericValues } = useContext(MyContext);
  const [columnState, setColumnState] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);

  function handleClickButton() {
    const starFilter = [];
    const { column, comparison, value } = filterByNumericValues[0];
    const myArray = [...columnState];
    const myState = [...filterByNumericValues];
    const removArray = columnState.indexOf(column);
    // console.log(removArray);
    myArray.splice(removArray, 1);
    myState[0] = { ...myState[0], column: myArray[0] };
    setColumnState(myArray);
    setFilterByNumericValues(myState);
    if (comparison === 'maior que') {
      filterData.forEach((item) => {
        if (Number(item[column]) > value) {
          starFilter.push(item);
        }
      });
    }
    if (comparison === 'menor que') {
      filterData.forEach((elem) => {
        if (Number(elem[column]) < value) {
          starFilter.push(elem);
        }
      });
    }
    if (comparison === 'igual a') {
      filterData.forEach((arr) => {
        if (arr[column] === value) {
          starFilter.push(arr);
        }
      });
    }
    setFilterData(starFilter);
  }
  // ajuda Eliel

  return (
    <div>
      <form className="form">
        <label htmlFor="label-colums">
          <select
            className="select-colums"
            data-testid="column-filter"
            onChange={ handleSelect }
            name="column"
          >
            { columnState.map((item) => (
              <option key={ item } value={ item }>{item}</option>))}

          </select>
        </label>
        <label htmlFor="label-number">
          <select
            className="length"
            data-testid="comparison-filter"
            onChange={ handleSelect }
            name="comparison"
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
        <label htmlFor="input1">
          <input
            className="number"
            name="value"
            data-testid="value-filter"
            min="0"
            type="number"
            onChange={ handleSelect }
            value={ filterByNumericValues[0].value }
          />
        </label>
        <button
          className="btn btn-1"
          type="button"
          data-testid="button-filter"
          onClick={ handleClickButton }
        >
          Filtrar

        </button>
      </form>
    </div>
  );
}

export default NumberFilter;
