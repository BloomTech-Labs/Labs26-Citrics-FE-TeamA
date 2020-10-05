import React, { useState } from 'react';

import { Button } from 'antd';

export default function AdvSearch() {
  const reset = {
    population: '',
    climate: '',
    budget: 0,
    homesize: '',
    submitted: false,
  };
  const [searchCities, setSearchCities] = useState(reset);

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

  function hideForm(e) {
    e.preventDefault();
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

  function handleSubmit() {
    resetHelper();
  }

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
      <div className="form-container" id="form-container">
        <h2>Find Your Preferred City</h2>
        <div className="adv-form-container">
          <p>
            Based off your answers provided in this form, we will display 5
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
                  className="adv-dropdown-select"
                  onChange={handleChange}
                  defaultValue={'DEFAULT'}
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
                  className="adv-dropdown-select"
                  onChange={handleChange}
                  defaultValue={'DEFAULT'}
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
                    min="0"
                    step="50"
                    className="adv-dropdown-budget"
                    value={searchCities.budget}
                    onChange={handleChange}
                  />
                </span>
              </div>
            </div>
            <div className="adv-question-container">
              <div className="label">
                <label>4. What's the largest housing type you prefer?</label>
              </div>
              <div className="adv-dropdown">
                <select
                  name="homesize"
                  className="adv-dropdown-select"
                  onChange={handleChange}
                  defaultValue={'DEFAULT'}
                >
                  <option value="DEFAULT" disabled>
                    -- Select an Option --
                  </option>
                  <option value="studio">Studio</option>
                  <option value="1br">1 bedroom</option>
                  <option value="2br">2 bedroom</option>
                  <option value="3br">3 bedroom</option>
                  <option value="4br">4 bedroom</option>
                </select>
              </div>
            </div>
            <div className="adv-search-buttons">
              <Button
                type="primary"
                className="adv-search-btn search"
                onSubmit={handleSubmit}
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
