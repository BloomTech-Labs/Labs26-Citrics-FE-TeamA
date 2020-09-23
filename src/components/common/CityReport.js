import React from 'react';
import './styles/CityReport.scss';
import Plotly from './Plotly';

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
        <Plotly />
      </div>
    </section>
  );
}

export default CityReport;
