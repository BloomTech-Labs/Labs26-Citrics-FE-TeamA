// Added as JSDOM does not support window.matchMedia yet
// Needs to be above imports
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { HomePage } from '../components/pages/Home';
import { LoadingComponent } from '../components/common';
import { BrowserRouter as Router } from 'react-router-dom';
window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
    };
  };

afterEach(cleanup);

describe('<HomeContainer /> testing suite', () => {
  test('mounts a page', async () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
  });
});
