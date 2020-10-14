import React, { useEffect, useState } from 'react';
import Loader from '../../../common/Loader';
import axios from '../../../../api/dsapi';

// /rental/predict/
export default function RentPredict({ compareList, lastCityState, searching }) {
  const [rentalPredictData, setRentalPredictData] = useState([]);
  useEffect(() => {
    //   For search bar loading knowledge
    //   setSearching({
    //     ...searching,
    //     walkability: true,
    //   });
    async function fetchRentalPredict() {
      const request = await axios.get(
        `/rental/predict/${lastCityState.lastCity}_${lastCityState.lastState}`
      );
      const res = JSON.parse(request.data);
      const filler = rentalPredictData;
      filler.push(res);
      setRentalPredictData(filler);
      // setSearching({
      //   ...searching,
      //   walkability: false,
      // });
    }
    fetchRentalPredict();
  }, [lastCityState.lastCity, lastCityState.lastState]);

  let rentalFill = {};
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const secondYearOut = currentYear + 2;
  function dynamicRentPredict(rentalPredictData, index) {
    if (index in rentalPredictData) {
      let currentCity =
        rentalPredictData[index].city[currentYear + 1] +
        ', ' +
        rentalPredictData[index].state[currentYear + 1];
      rentalFill[index] = [
        <section className="rentalFill" key={index}>
          <h3>{currentCity}</h3>
          <div className="rentalData">
            <div className="nextYear">
              <h5>{nextYear}</h5>
              <p>Studio</p>
              <p>{rentalPredictData[index].Studio[nextYear]}</p>
              <p>1 Bedroom</p>
              <p>{rentalPredictData[index].oner[nextYear]}</p>
              <p>2 Bedroom</p>
              <p>{rentalPredictData[index].twor[nextYear]}</p>
              <p>3 Bedroom</p>
              <p>{rentalPredictData[index].threebr[nextYear]}</p>
              <p>4 Bedroom</p>
              <p>{rentalPredictData[index].fourbr[nextYear]}</p>
            </div>
            <div className="twoYearsOut">
              <h5>{secondYearOut}</h5>
              <p>Studio</p>
              <p>{rentalPredictData[index].Studio[secondYearOut]}</p>
              <p>1 Bedroom</p>
              <p>{rentalPredictData[index].oner[secondYearOut]}</p>
              <p>2 Bedroom</p>
              <p>{rentalPredictData[index].twor[secondYearOut]}</p>
              <p>3 Bedroom</p>
              <p>{rentalPredictData[index].threebr[secondYearOut]}</p>
              <p>4 Bedroom</p>
              <p>{rentalPredictData[index].fourbr[secondYearOut]}</p>
            </div>
          </div>
        </section>,
      ];
    }
  }

  dynamicRentPredict(rentalPredictData, 0);
  dynamicRentPredict(rentalPredictData, 1);
  dynamicRentPredict(rentalPredictData, 2);

  return (
    <div>
      {rentalFill[0] && rentalFill[0]}
      {rentalFill[1] && rentalFill[1]}
      {rentalFill[2] && rentalFill[2]}
    </div>
  );
}
