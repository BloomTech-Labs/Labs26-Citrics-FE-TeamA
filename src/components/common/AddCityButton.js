import React from 'react';
import './styles/AddCityButton.scss';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const AddCityButton = () => {
  // A button for adding another city search bar
  return (
    <div className="site-button-ghost-wrapper">
      <Button>
        <PlusOutlined />
        Add City
      </Button>
    </div>
  );
};
export default AddCityButton;
