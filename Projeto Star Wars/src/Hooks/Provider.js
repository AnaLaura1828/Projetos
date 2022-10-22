import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import MyContext from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([{
    column: 'population', comparison: 'maior que', value: 0 }]);

  useEffect(() => {
    const getApi = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((elem) => elem.json());
      setData(results);
      setFilterData(results);
    };
    getApi();
  }, []);

  function handleOnChange({ target }) {
    setFilterByName({ name: target.value });
    const text = data.filter((planeta) => planeta.name.includes(target.value));
    // console.log(data);
    // vou fazer o filter dos meu dados que estao no filterData
    setFilterData(text);
    // console.log(text);
  }

  function handleSelect({ target }) {
    // console.log(setFilterByNumericValues);
    const filterNumber = [...filterByNumericValues];
    filterNumber[0] = { ...filterNumber[0], [target.name]: target.value };
    // console.log(filterNumber);
    setFilterByNumericValues(filterNumber);
  }

  return (
    <MyContext.Provider
      value={ {
        filterData,
        filterByName,
        handleOnChange,
        filterByNumericValues,
        handleSelect,
        setFilterData,
        setFilterByNumericValues,
      } }
    >
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
