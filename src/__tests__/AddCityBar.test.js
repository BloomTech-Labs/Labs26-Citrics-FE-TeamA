import React from 'react';
import AddCityBar from '../components/common/AddCityBar';
import { render } from '@testing-library/react';
import AddCityButton from '../components/common/AddCityButton';
const { getByPlaceholderText } = render(<AddCityBar />);
test('AddCityBar should have placeholder text', () => {
  expect(getByPlaceholderText(/input search/i)).toBeInTheDocument();
});
