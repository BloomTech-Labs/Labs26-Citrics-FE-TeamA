import React, { useState, useContext } from 'react';
import { Input } from 'antd';
import './styles/AutoComplete.scss';
import { SearchContext } from '../../state/contexts/ReportContext';
import { ReportContext } from '../../state/contexts/ReportContext';

function AutoCompleteInput() {
  let citySearched = useContext(SearchContext);
  let setCompareList = useContext(ReportContext);
  let compareList = useContext(ReportContext);

  // Input as search from ant design
  const { Search } = Input;
  // useState for input
  const [city, setCity] = useState({ city: '' });
  // useState for autocomplete options
  const [options, setOptions] = useState([]);

  citySearched = Object(citySearched);
  // console.log('CITY SEARCH',citySearch);

  const handleCityInputChange = event => {
    setCity({ city: event.target.value });
    let i = event.target.value.length;
    // Auto fill drop down options
    let optionsArr = [];

    Object.keys(citySearched).forEach(value => {
      // userInput capitalizes first letter of input to match api, w/o user having to do themselves
      if (i > 0) {
        let userInput =
          event.target.value.charAt(0).toUpperCase() +
          event.target.value.slice(1);
        // Checks if the user input matches each city, sliced from the beginning to the user input's word length
        if (userInput === value.slice(0, i)) {
          // logs the cities that come up for that match
          // console.log('VALUE LOG', value);
          // Once something matches, push it into optionsArr
          if (citySearched[value].length > 1) {
            citySearched[value].map(value => {
              // Multiple cities map and push
              return optionsArr.push(value);
            });
          } else {
            // single city push
            optionsArr.push(citySearched[value][0]);
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
            id="autocomplete_input"
            type="text"
            placeholder="Search City"
            enterButton
            value={city.city}
            onChange={event => handleCityInputChange(event)}
          />
          <div className="autocomplete">
            {options.length > 0 &&
              options.map(value => {
                // console.log('VALUE',value);
                return (
                  <p
                    onClick={(e) => {
                      // CityReport city={value[0]}  state={value[1]}
                      setOptions([]);
                      e.preventDefault();
                      e.stopPropagation();
                      setCompareList({
                        ...compareList,
                        city1: value[0],
                        state1: value[1]
                      });
                      setCity({ city: '' });
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
