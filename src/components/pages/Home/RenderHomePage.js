import React from 'react';
import AddCityButton from '../../common/AddCityButton';
import AddCityBar from '../../common/AddCityBar';
import CityReport from '../../common/CityReport';

function RenderHomePage() {
  return (
    <div>
      <h1>Welcome to Labs Basic SPA</h1>
      <section className="addingCities">
        <AddCityBar />
        {!AddCityBar && <AddCityButton />}
        {/* Adjust to have the button show when the city is recieved from DS */}
      </section>
      <div>
        <CityReport />
      </div>
    </div>
  );
}
export default RenderHomePage;
