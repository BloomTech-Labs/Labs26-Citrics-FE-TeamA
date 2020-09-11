import React from 'react';
import { render } from '@testing-library/react';
import Title from '../components/common/Title';

const { getByText } = render(<Title />);
test('Main title section should display', () => {
  expect(getByText(/Citrics/i)).toBeInTheDocument();
  expect(getByText(/Compare City Data/i)).toBeInTheDocument();
});
