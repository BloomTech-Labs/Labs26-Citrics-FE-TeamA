import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { HomePage } from '../components/pages/Home';
import { LoadingComponent } from '../components/common';
import { BrowserRouter as Router } from 'react-router-dom';

afterEach(cleanup);

describe('<HomeContainer /> testing suite', () => {
  test('mounts a page', async () => {
    const { getByText } = render(
      <Router>
        <HomePage
          LoadingComponent={() => (
            <LoadingComponent message="...fetching profile" />
          )}
        />
      </Router>
    );
  });
});
