import React, { useEffect, useState } from 'react';
import fetchCityData from '../../api/cityData';
import { Input } from 'antd';
import './styles/AutoComplete.scss';

// log the matching cities from input typed

function AutoCompleteInput() {
  // Input as search from ant design
  const { Search } = Input;
  // useState for input
  const [city, setCity] = useState({ city: '' });
  // useState for autocomplete options
  const [options, setOptions] = useState([]);
  // useState for axios errors
  const [error, setError] = useState('');
  const [cityData, setCityData] = useState([]);

  // An object of city data arrays
  const cityDataArr = {};

  useEffect(() => {
    getRentalData();
  }, []);
  // Rental Data from DS API
  const getRentalData = () => {
    fetchCityData()
      .then(response => {
        setCityData(response);
      })
      .catch(err => {
        setError(err.message);
      });
  };
  // For each item in cityData array, if it is not in the dicitonary cityDataArr yet, make an array for that city name
  cityData.forEach(value => {
    if (!(value.city in cityDataArr)) {
      cityDataArr[value.city] = [];
    }
    // Push each city and state name into the cityDataArr[state]
    cityDataArr[value.city].push([value.city, value.state]);
  });
  // console.log(cityDataArr);
  // console.log(cityData);

  const handleCityInputChange = event => {
    setCity({ city: event.target.value });
    let i = event.target.value.length;
    // Auto fill drop down options
    let optionsArr = [];

    Object.keys(cityDataArr).forEach(value => {
      // userInput capitalizes first letter of input to match api, w/o user having to do themselves
      if (i > 0) {
        let userInput =
          event.target.value.charAt(0).toUpperCase() +
          event.target.value.slice(1);
        // Checks if the user input matches each city, sliced from the beginning to the user input's word length
        if (userInput === value.slice(0, i)) {
          // logs the cities that come up for that match
          console.log(value);
          // Once something matches, push it into optionsArr
          if (cityDataArr[value].length > 1) {
            cityDataArr[value].map(value => {
              // Multiple cities map and push
              return optionsArr.push(value);
            });
          } else {
            // single city push
            optionsArr.push(cityDataArr[value][0]);
          }
          setOptions(optionsArr);
        }
      } else {
        setOptions([]);
      }
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <div className="App">
      <form onSubmit={event => handleSubmit(event)}>
        <label>
          <Search
            type="text"
            placeholder="Search City"
            enterButton
            onChange={event => handleCityInputChange(event)}
          />
          <div className="autocomplete">
            {options.length > 0 &&
              options.map(value => {
                console.log(value);
                return (
                  <p
                    onClick={() => {
                      console.log(cityDataArr[value[0]]);
                    }}
                  >
                    {value[0]}, {value[1]}
                  </p>
                );
              })}
          </div>
        </label>
      </form>
    </div>
  );
}

export default AutoCompleteInput;
