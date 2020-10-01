import React from 'react';
import Loader from '../../../common/Loader';
import Plot from 'react-plotly.js';

export default function RentPlot(props) {
  return !props.thisCityData.cityData ? (
    <Loader />
  ) : (
    <div>
      <Plot
        data={props.thisCityData.cityData}
        layout={props.thisCityData.cityLayout}
      />
    </div>
  );
}
