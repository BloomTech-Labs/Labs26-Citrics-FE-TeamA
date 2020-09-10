import React from 'react';
import AddCityButton from '../components/common/AddCityButton';
import { render } from '@testing-library/react';

const { getByText } = render(<AddCityButton />);
test('AddCityButton renders', () => {
  expect(getByText(/Add City/i)).toBeInTheDocument();
});

test('AddCityButton adds a new column', () => {
  // TODO ##########
});
