import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { fetchCityPlot } from '../../api/plotly';

export default function Plotly() {
  //  State for plotly json info
  const [thisCityData, setThisCityData] = useState([]);
  // retrieves the data from DS API and sets to state
  useEffect(() => {
    fetchCityPlot('Columbia')
      .then(response => {
        // console.log(response);
        setThisCityData(response);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  let thisCityDataArr = [];
  thisCityData &&
    Object.values(thisCityData).forEach(value => {
      //   console.log(value);
      thisCityDataArr.push(value);
    });
  console.log(thisCityDataArr[0], thisCityDataArr[1]);
  return (
    thisCityData && (
      <Plot data={thisCityDataArr[0]} layout={thisCityDataArr[1]} />
    )
  );
}
