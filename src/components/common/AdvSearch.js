import React, { useContext, useEffect, useState } from 'react';
import axios from '../../api/dsapi';

import { Button } from 'antd';
import { ReportContext } from '../../state/contexts/ReportContext';

export default function AdvSearch() {
  const reset = {
    population: '',
    climate: '',
    budget: '',
    homesize: '',
  };
  const [searchCities, setSearchCities] = useState(reset);
  const [advSearchResults, setAdvSearchResults] = useState([]);
  let compareContext = useContext(ReportContext);
  let randomCities = [];

  let selectTags = document.getElementsByTagName('select');
  let select = selectTags.length;

  function showForm(e) {
    e.preventDefault();
    document.getElementById('adv-search-btn').style.display = 'none';
    document.getElementById('form-container').style.display = 'block';
  }

  function resetHelper() {
    setSearchCities(reset);
    for (var i = 0; i < select; i++) {
      selectTags[i].selectedIndex = 0;
    }
  }

  function hideForm() {
    document.getElementById('adv-search-btn').style.display = 'block';
    document.getElementById('form-container').style.display = 'none';
    resetHelper();
  }

  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    setSearchCities({
      ...searchCities,
      [name]: value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    compareContext.setCompareList({ cities: [], searched: false });
    // fetch cities that match users preferences
    axios
      .get(
        `/adv_search/${searchCities.population}_${searchCities.homesize}_${searchCities.budget}_${searchCities.climate}`
      )
      .then(res => {
        // select 3 random cities from that response
        let advSearchData = JSON.parse(res.data)
          .sort(() => Math.random() - Math.random())
          .slice(0, 3);
        // pass those 3 cities into advSearchResults
        setAdvSearchResults(advSearchData);
        hideForm();
      })
      .catch(err => {
        console.log(
          'WWHHHOOOOOOAAAAAA, LOOOOKKKSSSS LIKE YOU ERRRRRROOOOORRRRREEEDDD OOOOUUUUUUTTTTTT!!!!'
        );
        document.getElementById('form-container').classList.add('error');
        setTimeout(() => {
          document.getElementById('form-container').classList.remove('error');
          alert('We cannot find any cities based on your preferences, please try again!');
        }, 700);
        setSearchCities(reset);
        resetHelper();
        console.log(err);
      });
  }
  // if advSearchResults not empty
  if (advSearchResults[2] !== undefined) {
    advSearchResults.map(idx => {
      // push city + state names to randomCities array
      return randomCities.push([idx.city, idx.state]);
    });
  }

  useEffect(() => {
    async function fetchThreeCities() {
      // when advSearchResults is full
      if ((await advSearchResults.length) !== 0) {
        // push random city names into compareList.cities array to begin search functions
        compareContext.setCompareList({
          ...compareContext.compareList,
          cities: [randomCities[0]],
          searched: true,
        });
        // space out cities being added to allow different stat cards to appear correctly
        // these times are currently the shortest we could trim to at the moment
        setTimeout(() => {
          compareContext.setCompareList({
            ...compareContext.compareList,
            cities: [randomCities[0], randomCities[1]],
            searched: true,
          });
        }, 4000);
        setTimeout(() => {
          compareContext.setCompareList({
            ...compareContext.compareList,
            cities: [randomCities[0], randomCities[1], randomCities[2]],
            searched: true,
          });
        }, 8000);
      }
    }
    fetchThreeCities();
  }, [advSearchResults]);

  return (
    <div className="adv-search-div-container">
      <Button
        type="primary"
        className="adv-search-btn show"
        id="adv-search-btn"
        onClick={showForm}
      >
        Advanced Search
      </Button>
      <div id="form-container">
        <h2>Find Your Preferred City</h2>
        <div className="adv-form-container">
          <p>
            Based off your answers provided in this form, we will display 3
            cities that match your desired options.
          </p>
          <form>
            <div className="adv-question-container">
              <div className="label">
                <label>1. What is the ideal city size you would live in?</label>
              </div>
              <div className="adv-dropdown">
                <select
                  name="population"
                  id="population"
                  className="adv-dropdown-select"
                  onChange={handleChange}
                  defaultValue={'DEFAULT'}
                  required
                >
                  <option value="DEFAULT" disabled>
                    -- Select an Option --
                  </option>
                  <option value="75000">Town (0-74,999)</option>
                  <option value="399999">Small City (75,000-399,999)</option>
                  <option value="699999">Medium City (400,000-699,999)</option>
                  <option value="700000">Large City (700,000+)</option>
                </select>
              </div>
            </div>
            <div className="adv-question-container">
              <div className="label">
                <label>2. What type of climate do you prefer?</label>
              </div>
              <div className="adv-dropdown">
                <select
                  name="climate"
                  id="climate"
                  className="adv-dropdown-select"
                  onChange={handleChange}
                  defaultValue={'DEFAULT'}
                  required
                >
                  <option value="DEFAULT" disabled>
                    -- Select an Option --
                  </option>
                  <option value="cold">Cold (0°F-49°F)</option>
                  <option value="mild">Mild (50°F-69°F)</option>
                  <option value="hot">Hot (70°F+)</option>
                </select>
              </div>
            </div>
            <div className="adv-question-container">
              <div className="label">
                <label>3. What is your monthly housing budget?</label>
              </div>
              <div className="adv-dropdown">
                <span className="input-symbol">
                  <input
                    type="number"
                    name="budget"
                    id="budget"
                    className="adv-dropdown-budget"
                    min="0"
                    step="50"
                    value={searchCities.budget}
                    onChange={handleChange}
                    required
                  />
                </span>
              </div>
            </div>
            <div className="adv-question-container">
              <div className="label">
                <label>
                  4. What is the minimum number of bedrooms you need?
                </label>
              </div>
              <div className="adv-dropdown">
                <select
                  name="homesize"
                  id="homesize"
                  className="adv-dropdown-select"
                  onChange={handleChange}
                  defaultValue={'DEFAULT'}
                  required
                >
                  <option value="DEFAULT" disabled>
                    -- Select an Option --
                  </option>
                  <option value="0">Studio</option>
                  <option value="1">1 bedroom</option>
                  <option value="2">2 bedroom</option>
                  <option value="3">3 bedroom</option>
                  <option value="4">4 bedroom</option>
                </select>
              </div>
            </div>
            <div className="adv-search-buttons">
              <Button
                type="primary"
                className="adv-search-btn search"
                onClick={handleSubmit}
              >
                Search
              </Button>
              <Button
                type="primary"
                className="adv-search-btn cancel"
                onClick={hideForm}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
