import React from 'react';
import AddCityButton from '../components/common/AddCityButton';
import { render } from '@testing-library/react';

test('AddCityButton renders', () => {
  const { getByText } = render(<AddCityButton />);
  expect(getByText(/Add City/i)).toBeInTheDocument();
});
