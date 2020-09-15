import React, { useState } from 'react';
import cityData from '../../api/cityData';

console.log(cityData);
const cityDataArr = {};
cityData.forEach(value => {
  // console.log(value.city[0], value.state);
  if (!(value.city in cityDataArr)) {
    cityDataArr[value.city] = [];
  }
  cityDataArr[value.city].push([value.city, value.state]);
});
console.log(cityDataArr);

function AutoCompleteInput() {
  const [city, setCity] = useState({ city: '' });
  const handleNameChange = event => {
    setCity({ city: event.target.value });
    console.log(event.target.value);
    let i = event.target.value.length - 1;
    Object.keys(cityDataArr).forEach(value => {
      if (i > 0) {
        if (event.target.value === value.slice(0, i)) {
          console.log(value);
          if (cityDataArr[value].length > 1) {
            cityDataArr[value].map(value => {
              console.log(value);
            });
          } else {
            console.log(cityDataArr[value][0]);
          }
        }
      }
    });
  };
  // console.log(currCities);
  const handleSubmit = event => {
    event.preventDefault();
    console.log(city);
  };

  return (
    <div className="App">
      {/* {console.log(city)} */}
      <form onSubmit={event => handleSubmit(event)}>
        <label>
          <input
            type="text"
            placeholder="Search City"
            onChange={event => handleNameChange(event)}
          />
        </label>
        <button>Submit!</button>
      </form>
    </div>
  );
}

export default AutoCompleteInput;
