import React from 'react';
import AddCityBar from './AddCityBar';
import AddCityButton from './AddCityButton';

export default function AddingCities() {
  return (
    <section className="addingCities">
      <AddCityBar />
      {!AddCityBar && <AddCityButton />}
      {/* Adjust to have the button show when the city is recieved from DS */}
    </section>
  );
}
