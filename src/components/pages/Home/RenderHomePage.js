import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import AddCityButton from '../../common/AddCityButton';
import AddCityBar from '../../common/AddCityBar';

function RenderHomePage() {
  return (
    <div>
      <h1>Welcome to Labs Basic SPA</h1>
      <div>
        <p>
          This is an example of a common example of how we'd like for you to
          approach components.
        </p>
        <p>
          <Link to="/profile-list">Profiles Example</Link>
        </p>
        <p>
          <Link to="/example-list">Example List of Items</Link>
        </p>
        <p>
          <Link to="/datavis">Data Visualizations Example</Link>
        </p>

        <section className="addingCities">
          <AddCityBar />
          {!AddCityBar && <AddCityButton />}
          {/* Adjust to have the button show when the city is recieved from DS */}
        </section>
      </div>
    </div>
  );
}
export default RenderHomePage;
