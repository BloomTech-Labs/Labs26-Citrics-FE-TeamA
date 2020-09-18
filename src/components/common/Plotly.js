import React, { useEffect, useState, useContext } from 'react';
import Plot from 'react-plotly.js';
import {
  reportRentData,
  reportWeatherData,
  reportWalkData,
} from '../../api/reportData';
import { ReportContext } from '../../state/contexts/ReportContext';

import { Popover, Button } from 'antd';

export default function Plotly() {
  //  State for plotly json info
  const [thisCityData, setThisCityData] = useState([]);
  const [walkCityData, setwalkCityData] = useState([]);
  const [weatherCityData, setweatherCityData] = useState([]);
  let { compareList } = useContext(ReportContext);
  let content = (
    <div>
      <p>
        {walkCityData.city} Score: {walkCityData.walkability}
      </p>
      <p>How fun it is to walk somewhere yenno?</p>
    </div>
  );
  let content2 = (
    <div>
      <p> </p>
      <p>How fun it is to walk somewhere yenno?</p>
    </div>
  );
  // retrieves the data from DS API and sets to state;
  useEffect(() => {
    reportRentData(compareList.city1, compareList.state1)
      .then(res => {
        console.log('reportRentData RES', res.data);
        setThisCityData(res);
      })
      .catch(err => {
        console.log(err);
      });

    reportWeatherData(compareList.city1, compareList.state1)
      .then(res => {
        console.log('reportWeatherData RES', res);
        setweatherCityData(res);
      })
      .catch(err => {
        console.log(err);
      });

    reportWalkData(compareList.city1, compareList.state1)
      .then(res => {
        console.log('reportWalkData RES', res.data);
        setwalkCityData(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, [compareList]);

  // let thisCityDataArr = [];
  // console.log('thisCityDataArr -->', thisCityDataArr);
  // thisCityData &&
  //   Object.values(thisCityData).forEach(value => {
  //     // console.log('thisCityDataArr Value',value);
  //     thisCityDataArr.push(value);
  //   });
  console.log('WALK CITY DATA', walkCityData);
  return (
    thisCityData && (
      <div>
        <Plot data={thisCityData.data} layout={thisCityData.layout} />
        <Popover content={content} title="Walkability Score">
          <Button type="primary">Walkability</Button>
        </Popover>
        <Popover content={content2} title="Weather">
          <Button type="primary">Weather</Button>
        </Popover>
      </div>
    )
  );
}
