import React from 'react';
import { render } from '@testing-library/react';
import Title from '../components/pages/Home/Title';

const { getByText } = render(<Title />);
test('Main title section should display', () => {
  expect(
    getByText(/Make the right choice for your new home/i)
  ).toBeInTheDocument();
});
