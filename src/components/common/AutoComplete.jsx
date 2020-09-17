import React, { useState, useContext } from 'react';
import { Input } from 'antd';
import './styles/AutoComplete.scss';
import { SearchContext } from '../../state/contexts/ReportContext';
import { ReportContext } from '../../state/contexts/ReportContext';

function AutoCompleteInput() {
  let citySearch = useContext(SearchContext);
  let {compareList, setCompareList} = useContext(ReportContext);

  // Input as search from ant design
  const { Search } = Input;
  // useState for input
  const [city, setCity] = useState({ city: '' });
  // useState for autocomplete options
  const [options, setOptions] = useState([]);

  citySearch = Object(citySearch);
  // console.log('CITY SEARCH',citySearch);


  const handleCityInputChange = event => {
    setCity({ city: event.target.value });
    let i = event.target.value.length;
    // Auto fill drop down options
    let optionsArr = [];

    Object.keys(citySearch).forEach(value => {
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
          if (citySearch[value].length > 1) {
            citySearch[value].map(value => {
              // Multiple cities map and push
              return optionsArr.push(value);
            });
          } else {
            // single city push
            optionsArr.push(citySearch[value][0]);
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
                // console.log('VALUE',value);
                return (
                  <p
                    onClick={() => {
                      // CityReport city={value[0]}  state={value[1]}
                      setCompareList(citySearch[value[0]]);
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
