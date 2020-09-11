import React from 'react';
import CityReport from '../../common/CityReport';
import Title from '../../common/Title';
import AddingCities from '../../common/AddingCities';
function RenderHomePage() {
  return (
    <>
      <Title />
      <AddingCities />
      <CityReport />
    </>
  );
}
export default RenderHomePage;
