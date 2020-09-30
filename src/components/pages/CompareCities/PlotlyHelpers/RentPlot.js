import React from 'react';
import Loader from '../../../common/Loader';
import Plot from 'react-plotly.js';

export default function RentPlot(props) {
  return !props.thisCityData.cityData1 ? (
    <Loader />
  ) : (
    <div>
      <Plot
        data={props.thisCityData.cityData1}
        layout={props.thisCityData.cityLayout1}
      />
    </div>
  );
}
