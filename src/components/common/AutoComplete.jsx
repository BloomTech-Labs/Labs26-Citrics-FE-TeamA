import React, { useState, useContext } from 'react';
import { Input } from 'antd';
import './styles/AutoComplete.scss';
import { SearchContext } from '../../state/contexts/ReportContext';

function AutoCompleteInput(props) {
  let searchOps = props.searchOptions;
  let citySearched = useContext(SearchContext);

  // Input as search from ant design
  const { Search } = Input;
  // useState for input
  const [city, setCity] = useState({ city: '' });
  // useState for autocomplete options
  const [options, setOptions] = useState([]);

  citySearched = Object(citySearched);

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
  const handleOnSearch = value => {
    let filler = props.compareList.cities;
    let Arr = [
      value[0].toUpperCase() + value.slice(1, -4).toLowerCase(),
      value.slice(-2, value.length).toUpperCase(),
    ];

    filler.push(Arr);
    setOptions([]);
    props.setCompareList({
      cities: filler,
      searched: true,
    });
    setCity({ city: '' });
  };
  let weather = searchOps.searching['weather'];
  let rent = searchOps.searching['rent'];
  let unemployment = searchOps.searching['unemployment'];
  let walkability = searchOps.searching['walkability'];

  return (
    <div className="App">
      <div className="searchWithOptions">
        {' '}
        <h5>Search City: </h5>
        <p>Advanced Search</p>
      </div>{' '}
      {weather !== true && rent !== true && unemployment !== true && (
        <Search
          id="autocomplete_input"
          type="text"
          placeholder="Ex: Tulsa, OK"
          value={city.city}
          enterButton
          onChange={event => handleCityInputChange(event)}
          onSearch={value => {
            handleOnSearch(value);
          }}
        />
      )}
      <div className="autocomplete">
        {options.length > 0 &&
          options.map(value => {
            return (
              <p
                key={value[0] + value[1]}
                onClick={event => {
                  // CityReport city={value[0]}  state={value[1]}
                  let filler = props.compareList.cities;
                  filler.push(value);
                  setOptions([]);
                  event.preventDefault();
                  event.stopPropagation();
                  props.setCompareList({
                    cities: filler,
                    searched: true,
                  });
                  setCity({ city: '' });
                }}
              >
                {value[0]}, {value[1]}
              </p>
            );
          })}
      </div>
    </div>
  );
}

export default AutoCompleteInput;
