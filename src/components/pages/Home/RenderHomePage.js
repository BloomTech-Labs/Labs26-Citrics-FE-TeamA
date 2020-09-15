import React from 'react';
import CityReport from '../../common/CityReport';
import Title from '../../common/Title';
import AddingCities from '../../common/AddingCities';
function RenderHomePage() {
  // state of home page. default state is StaticHomePageComp
  return (
    <>
      <div className="colorTitle">
        <Title />
        <AddingCities />
      </div>
      <CityReport />
    </>
    // if no search : <StaticHomePageComp/> ? <CityReport/>
  );
}
export default RenderHomePage;
