import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from '../components/common/NavBar';

describe('Navbar Common Component', () => {
  test('Home option on Navbar should appear', () => {
    const { getByText } = render(
      <Router>
        <NavBar />
      </Router>
    );
    const home = getByText(/home/i);
    expect(home.textContent).toBe('Home');
  });
});
