import React, { useEffect, useState } from 'react';
import './styles/CityReport.scss';
import { ReportContext } from '../../state/contexts/ReportContext';
import Plotly from './Plotly';
import { fetchCityPlot } from '../../api/plotly';

let thisCityDataArr = ['Tulsa', 'Oklahoma City'];

function CityReport() {
  return (
    <div>
      <div className="report-container">
        <div className="average-rent">
          <h1>Average Rent</h1>
          <Plotly thisCityDataArr={thisCityDataArr} />;
        </div>
      </div>
    </div>
  );
}

export default CityReport;
