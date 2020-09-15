import React from 'react';
import AddCityBar from '../components/common/AddCityBar';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const { getByPlaceholderText } = render(<AddCityBar />);
test('AddCityBar should have placeholder text', () => {
  expect(getByPlaceholderText(/Search city/i)).toBeInTheDocument();
});
test('Should add text to the input', async () => {
  const { getByPlaceholderText } = render(<AddCityBar />);
  fireEvent.click(getByPlaceholderText(/search city/i));
  await userEvent.type(getByPlaceholderText(/search city/i), 'Hello there!');

  expect(getByPlaceholderText(/search city/i)).toHaveValue('Hello there!');
});
