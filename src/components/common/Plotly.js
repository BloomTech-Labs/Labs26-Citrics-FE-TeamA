import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { fetchCityPlot } from '../../api/plotly';
import axios from 'axios';
export default function Plotly() {
  const [thisCityData, setThisCityData] = useState([]);
  useEffect(() => {
    fetchCityPlot('Tulsa')
      .then(response => {
        // console.log(response);
        setThisCityData(response);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // console.log(thisCityData);
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
