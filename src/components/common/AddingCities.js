import React from 'react';
import AddCityBar from './AddCityBar';
import './styles/AddCityBar.scss';

export default function AddingCities(props) {
  return (
    <section className="addingCities">
      <AddCityBar searchOptions={props.searchOptions} />
    </section>
  );
}
