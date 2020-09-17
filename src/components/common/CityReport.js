import React from 'react';
import './styles/CityReport.scss';
import Plotly from './Plotly';

function CityReport() {
  return (
    <div>
      <div className="report-container">
        <div className="average-rent">
          <h1>Average Rent</h1>
          <Plotly />;
        </div>
      </div>
    </div>
  );
}

export default CityReport;
