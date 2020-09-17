import React, { useEffect, useState, useContext } from 'react';
import Plot from 'react-plotly.js';
import { fetchCityPlot } from '../../api/plotly';
import { ReportContext } from '../../state/contexts/ReportContext';

export default function Plotly() {
  //  State for plotly json info
  const [thisCityData, setThisCityData] = useState([]);
  let { compareList } = useContext(ReportContext);
  // retrieves the data from DS API and sets to state
  compareList[0] && console.log('DYNAMIC CITY', compareList[0][0][0]);
  useEffect(() => {
    fetchCityPlot(compareList)
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
  // console.log(thisCityDataArr[0], thisCityDataArr[1]);
  return (
    thisCityData && (
      <Plot data={thisCityDataArr[0]} layout={thisCityDataArr[1]} />
    )
  );
}
