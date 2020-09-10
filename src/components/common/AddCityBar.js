import React from 'react';
import { Input } from 'antd';

const AddCityBar = () => {
  const { Search } = Input;

  return (
    <Search
      placeholder="input search text"
      onSearch={value => console.log(value)}
      enterButton
    />
  );
};
export default AddCityBar;
