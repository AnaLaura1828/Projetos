import React, { useContext } from 'react';
import MyContext from '../Hooks/Context';

function Table() {
  const { filterData } = useContext(MyContext);
  return (
    <div className="div-table">
      <table>
        <thead>
          <tr>
            <th className="table">Name</th>
            <th className="table">Rotation</th>
            <th className="table">Orbital</th>
            <th className="table">Diameter</th>
            <th className="table">Climate</th>
            <th className="table">Gravity</th>
            <th className="table">Terrain</th>
            <th className="table">Surface_water</th>
            <th className="table">Population</th>
            <th className="table">Films</th>
            <th className="table">Created</th>
            <th className="table">Edited</th>
            <th className="table">Url</th>
          </tr>
        </thead>
        <tbody>
          {filterData.map((elem) => (
            <tr className="map-table" key={ elem.name }>
              <td className="td-table">{elem.name}</td>
              <td className="td-table">{elem.rotation_period}</td>
              <td className="td-table">{elem.orbital_period}</td>
              <td className="td-table">{elem.diameter}</td>
              <td className="td-table">{elem.climate}</td>
              <td className="td-table">{elem.gravity}</td>
              <td className="td-table">{elem.terrain}</td>
              <td className="td-table">{elem.surface_water}</td>
              <td className="td-table">{elem.population}</td>
              <td className="td-table">{elem.films}</td>
              <td className="td-table">{elem.created}</td>
              <td className="td-table">{elem.edited}</td>
              <td className="td-table">{elem.url}</td>
            </tr>
          )).filter((chave) => chave !== 'residents')}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
