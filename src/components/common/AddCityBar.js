import React from 'react';
import './styles/AddCityBar.scss';
import AutoCompleteInput from './AutoComplete';

const AddCityBar = () => {
  // Search bar for adding cities
  return (
    // <Search
    //   placeholder="input search text"
    //   onSearch={value => console.log(value)}
    //   enterButton
    // />
    <AutoCompleteInput />
  );
};
export default AddCityBar;
