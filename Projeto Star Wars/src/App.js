import React from 'react';
import './App.css';

import InputText from './Componentes/InputText';
import NumberFilter from './Componentes/NumberFilter';
import Table from './Componentes/Table';

function App() {
  document.title = 'Projeto Trybe - Star Wars';
  return (
    <div className="background-app">
      <img src="https://assets.stickpng.com/images/602175e40ad3230004b93c20.png" alt="Logo star Wars" className="img" />
      <span>
        <InputText />
        <NumberFilter />
        <Table />
      </span>

    </div>
  );
}

export default App;
