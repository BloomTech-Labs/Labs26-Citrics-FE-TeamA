import React from 'react';
import CityReport from '../../common/CityReport';
import Title from '../../common/Title';
import AddingCities from '../../common/AddingCities';
import StaticHomePage from '../../common/StaticHomePage';
function RenderHomePage() {
  return (
    <>
      <div className="colorTitle">
        <Title />
      </div>
      <AddingCities />
      <StaticHomePage />
      <CityReport />
    </>
  );
}
export default RenderHomePage;
