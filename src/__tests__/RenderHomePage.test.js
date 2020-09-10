import './matchMedia.mock.js';
import RenderHomePage from '../components/pages/Home/RenderHomePage';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';

describe('<RenderHomePage /> test suite', () => {
  test('it handles a loading state', () => {
    render(
      <Router>
        <RenderHomePage />
      </Router>
    );
  });
});
