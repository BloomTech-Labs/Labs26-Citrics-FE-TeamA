import React, { useEffect, useState } from 'react';
import Loader from '../../../common/Loader';
import axios from '../../../../api/dsapi';
// /rental/predict/
export default function RentPredict({
  compareList,
  lastCityState,
  searching,
  number,
}) {
  const [rentalPredictData, setRentalPredictData] = useState([]);
  useEffect(() => {
    async function fetchRentalPredict() {
      const request = await axios.get(
        `/rental/predict/${lastCityState.lastCity}_${lastCityState.lastState}`
      );
      const res = JSON.parse(request.data);
      const filler = rentalPredictData;
      filler.push(res);
      setRentalPredictData(filler);
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
          <div className="rentalPredictData">
            {rentalPredictData[index] === rentalPredictData[0] ? (
              <div className="yaxis">
                <h5># of Rooms</h5>
                <p>Studio</p>
                <p>1 Bedroom</p>
                <p>2 Bedroom</p>
                <p>3 Bedroom</p>
                <p>4 Bedroom</p>
              </div>
            ) : (
              <div className="yaxis">
                <h5> </h5>
                <p> </p>
                <p> </p>
                <p> </p>
                <p> </p>
                <p> </p>
              </div>
            )}
            <div className="nextYear">
              <h5>{nextYear}</h5>
              <p>{rentalPredictData[index].Studio[nextYear]}</p>
              <p>{rentalPredictData[index].onebr[nextYear]}</p>
              <p>{rentalPredictData[index].twobr[nextYear]}</p>
              <p>{rentalPredictData[index].threebr[nextYear]}</p>
              <p>{rentalPredictData[index].fourbr[nextYear]}</p>
            </div>
            <div className="twoYearsOut">
              <h5>{secondYearOut}</h5>
              <p>{rentalPredictData[index].Studio[secondYearOut]}</p>
              <p>{rentalPredictData[index].onebr[secondYearOut]}</p>
              <p>{rentalPredictData[index].twobr[secondYearOut]}</p>
              <p>{rentalPredictData[index].threebr[secondYearOut]}</p>
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
    <div className="rentalPredict">
      {rentalFill[0] && rentalFill[0]}
      {rentalFill[1] && rentalFill[1]}
      {rentalFill[2] && rentalFill[2]}
    </div>
  );
}
