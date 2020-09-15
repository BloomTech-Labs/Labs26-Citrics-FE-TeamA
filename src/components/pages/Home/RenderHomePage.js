import React from 'react';
import CityReport from '../../common/CityReport';
import Title from '../../common/Title';
import AddingCities from '../../common/AddingCities';
import StaticHomePage from '../../common/StaticHomePage';
function RenderHomePage() {
  // state of home page. default state is StaticHomePageComp
  return (
    <>
      <div className="colorTitle">
        <Title />
      </div>
      <AddingCities />
      <StaticHomePage />
      <CityReport />
    </>
    // if no search : <StaticHomePageComp/> ? <CityReport/>
  );
}
export default RenderHomePage;
