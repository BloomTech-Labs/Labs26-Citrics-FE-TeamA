import React from 'react';
import './styles/CityReport.scss';
import Plotly from '../pages/CompareCities/Plotly';

function CityReport(props) {
  let citySpace;
  if (
    props.compareList.cities !== undefined &&
    props.compareList.cities.length === 1
  ) {
    citySpace = { alignItems: 'center' };
  }
  return (
    <section className="report-container" style={citySpace}>
      <div className="report-div">
        <Plotly searchOptions={props.searchOptions} />
      </div>
    </section>
  );
}

export default CityReport;
