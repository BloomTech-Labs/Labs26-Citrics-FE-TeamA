import React, { useEffect, useState, useContext } from 'react';
import Plot from 'react-plotly.js';
import { fetchCityPlot } from '../../api/plotly';
import { ReportContext } from '../../state/contexts/ReportContext';

export default function Plotly() {
  //  State for plotly json info
  const [thisCityData, setThisCityData] = useState([]);
  let { compareList } = useContext(ReportContext);
  // retrieves the data from DS API and sets to state;
  useEffect(() => {
    fetchCityPlot(compareList.city1)
      .then(res => {
        console.log('fetchCityPlot RES', res.data);
        setThisCityData(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, [compareList]);

  let thisCityDataArr = [];
  thisCityData &&
    Object.values(thisCityData).forEach(value => {
      //   console.log(value);
      thisCityDataArr.push(value);
    });
  return (
    thisCityData && (
      <Plot data={thisCityDataArr[0]} layout={thisCityDataArr[1]} />
    )
  );
}
