import React, { useState } from 'react';
import cityData from '../../api/cityData';

console.log(cityData);
const cityDataArr = {};
cityData.forEach(value => {
  // console.log(value.city[0], value.state);
  if (value.city in cityDataArr) {
    cityDataArr[value.city].push([value.city, value.state]);
  } else {
    cityDataArr[value.city] = [];
    cityDataArr[value.city].push([value.city, value.state]);
  }
});
console.log(cityDataArr);

function AutoCompleteInput() {
  const [city, setCity] = useState({ city: '' });

  const handleNameChange = event => {
    setCity({ city: event.target.value });
    console.log(event.target.value);

    Object.keys(cityDataArr).forEach(value => {
      // console.log(value[0]);
      if (event.target.value === value[0]) {
        console.log(value);
        console.log(cityDataArr[value]);
      }
    });
    // if (event.target.value == cityDataArr[]) {
    //   console.log(value.city);
    // }
  };

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
