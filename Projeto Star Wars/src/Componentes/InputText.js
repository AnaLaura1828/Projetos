import React, { useContext } from 'react';
import MyContext from '../Hooks/Context';

function InputText() {
  const { handleOnChange } = useContext(MyContext);
  return (
    <div className="div-pesquisa">
      <label className="label-pesquise" htmlFor="input1">
        <input
          className="pesquisa"
          name="input-text"
          data-testid="name-filter"
          placeholder="Pesquise"
          onChange={ handleOnChange }
        />
      </label>
    </div>
  );
}

export default InputText;
