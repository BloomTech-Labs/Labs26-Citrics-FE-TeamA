import React from 'react';
import AutoComplete from '../components/common/AutoComplete';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const { getByPlaceholderText } = render(<AutoComplete />);
test('AddCityBar should have placeholder text', () => {
  expect(getByPlaceholderText(/Search city/i)).toBeInTheDocument();
});
test('Should add text to the input', async () => {
  const { getByPlaceholderText, getByText } = render(<AutoComplete />);
  fireEvent.click(getByPlaceholderText(/search city/i));
  await userEvent.type(getByPlaceholderText(/search city/i), 'Berkeley');

  expect(getByPlaceholderText(/search city/i)).toHaveValue('Berkeley');
});
