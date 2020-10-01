import React, { useState } from 'react';

import { Button } from 'antd';

export default function AdvSearch() {
  const [searchCities, setSearchCities] = useState({
    population: null,
    climate: null,
    budget: null,
  });

  const advSearchBtn = document.getElementById('adv-search-btn');
  const formContainer = document.getElementById('form-container');

  function showForm(e) {
    e.preventDefault();
    advSearchBtn.style.display = 'none';
    formContainer.style.display = 'flex';
  }

  function hideForm(e) {
    e.preventDefault();
    advSearchBtn.style.display = 'block';
    formContainer.style.display = 'none';
  }

  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    setSearchCities({
      ...searchCities,
      [name]: value,
    });
  }

  function clearForm() {
    setSearchCities({
      ...searchCities,
      population: '',
      climate: '',
      budget: 'Ex: $1,150',
    });
  }

  return (
    <div className="adv-search-div-container">
      <Button type="primary" id="adv-search-btn" onClick={showForm}>
        Advanced Search
      </Button>
      <div className="form-container" id="form-container">
        <div className="adv-header">
          <h2>Find Your Preferred City</h2>
        </div>
        <div className="adv-form-container">
          <p>Description of advanced search and how it works lol</p>
          <form onReset={clearForm}>
            <div className="adv-question-container">
              <label>1. What is the ideal city size you would live in?</label>
              <div className="adv-dropdown">
                <select value={searchCities.population} onChange={handleChange}>
                  <option name="town">Town (0-74,999)</option>
                  <option name="small-city">Small City (75,000-399,999)</option>
                  <option name="med-city">Medium City (75,000-399,999)</option>
                  <option name="lard-city">Large City (700,000+)</option>
                </select>
              </div>
            </div>
            <div className="adv-question-container">
              <label>2. What type of climate do you prefer?</label>
              <div className="adv-dropdown">
                <select value={searchCities.climate} onChange={handleChange}>
                  <option name="cold">Cold (0°F-49°F)</option>
                  <option name="mild">Mild (50°F-69°F)</option>
                  <option name="hot">Hot (70°F+)</option>
                </select>
              </div>
            </div>
            <div className="adv-question-container">
              <label>3. What is your monthly housing budget?</label>
              <div className="adv-dropdown">
                <span className="input-symbol">
                  <input
                    type="number"
                    name="rent"
                    placeholder="Ex: 1,150"
                    min="0"
                    value={searchCities.budget}
                  />
                </span>
              </div>
            </div>
            <Button type="primary" id="adv-search-btn" onClick={clearForm}>
              Clear
            </Button>
          </form>
        </div>
        <Button type="primary" id="adv-search-btn" onClick={hideForm}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
