import React from 'react';
import { Input } from 'antd';
import './styles/AddCityBar.scss';
import AutoCompleteInput from './AutoComplete';

const AddCityBar = () => {
  const { Search } = Input;
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
