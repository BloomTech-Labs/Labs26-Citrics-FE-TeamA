import React, { useState } from 'react';
import cityData from '../../api/cityData';
import { Input } from 'antd';
// logging the city data
// console.log(cityData);
const cityDataArr = {};
cityData.forEach(value => {
  // console.log(value.city[0], value.state);
  if (!(value.city in cityDataArr)) {
    cityDataArr[value.city] = [];
  }
  cityDataArr[value.city].push([value.city, value.state]);
});
// log the matching cities from input typed
console.log(cityDataArr);

function AutoCompleteInput() {
  const { Search } = Input;
  const [city, setCity] = useState({ city: '' });
  const [options, setOptions] = useState([]);

  const handleNameChange = event => {
    setCity({ city: event.target.value });
    console.log(event.target.value);
    let i = event.target.value.length;
    let optionsArr = [];
    Object.keys(cityDataArr).forEach(value => {
      // userInput capitalizes first letter of input to match api, w/o user having to do themselves
      let userInput = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1);
        if (userInput === value.slice(0, i)) {
          // logs the cities that come up for that match
          // console.log(value, 'city');
          if (cityDataArr[value].length > 1) {
            cityDataArr[value].map(value => {
              return optionsArr.push(value);
            });
          } else {
            optionsArr.push(cityDataArr[value][0], 'single city, state');
          }
          setOptions(optionsArr);
        }
      });
      console.log('OPTIONS array with matching cities', { options });
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
          <Search
            type="text"
            placeholder="Search City"
            enterButton
            onChange={event => handleNameChange(event)}
          />
        </label>
      </form>
    </div>
  );
}

export default AutoCompleteInput;
