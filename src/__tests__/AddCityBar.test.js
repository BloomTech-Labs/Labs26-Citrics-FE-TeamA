import React from 'react';
import AddCityBar from '../components/common/AddCityBar';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
test('AddCityBar should have placeholder text', () => {
  const { getByPlaceholderText } = render(<AddCityBar />);

  expect(getByPlaceholderText(/Search city/i)).toBeInTheDocument();
});
test('Should add text to the input', async () => {
  const { debug, rerender, getByDisplayValue, getByPlaceholderText } = render(
    <AddCityBar />
  );

  expect(getByPlaceholderText(/Search city/i)).toBeInTheDocument();
  await waitFor(() => {
    rerender(<AddCityBar />);
  });
  fireEvent.click(getByPlaceholderText(/search city/i));
  debug();
  userEvent.type(getByPlaceholderText(/search city/i), 'Berkeley');
  debug();
  await waitFor(() => {
    rerender(<AddCityBar />);
  });
  expect(getByDisplayValue(/Berkeley/i)).toBeInTheDocument();
});
