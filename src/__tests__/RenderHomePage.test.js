// Added as JSDOM does not support window.matchMedia yet
// Needs to be above imports
import RenderHomePage from '../components/pages/Home/RenderHomePage';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';

window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
    };
  };

describe('<RenderHomePage /> test suite', () => {
  test('it handles a loading state', () => {
    render(
      <Router>
        <RenderHomePage />
      </Router>
    );
  });
});
