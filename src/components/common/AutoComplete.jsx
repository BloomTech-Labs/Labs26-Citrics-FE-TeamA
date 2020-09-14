import React, { useState } from 'react';
import cityData from '../../api/cityData';

console.log(cityData);
function AutoCompleteInput() {
  const [city, setCity] = useState({ city: '' });

  const handleNameChange = event => {
    setCity({ city: event.target.value });
    console.log(event.target.value);
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
