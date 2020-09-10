import React from 'react';
import AddCityBar from '../components/common/AddCityBar';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const { getByPlaceholderText } = render(<AddCityBar />);
test('AddCityBar should have placeholder text', () => {
  expect(getByPlaceholderText(/input search/i)).toBeInTheDocument();
});
test('Should add text to the input', async () => {
  const { getByPlaceholderText } = render(<AddCityBar />);
  fireEvent.click(getByPlaceholderText(/input/i));
  await userEvent.type(getByPlaceholderText(/input/i), 'Hello there!');
  //   fireEvent.keyDown(getByPlaceholderText(/input/i), { key: 'A', code: 'KeyA' });
  //   fireEvent.keyDown(getByPlaceholderText(/input/i), {
  //     key: 'Enter',
  //     code: 'Enter',
  //   });
  expect(getByPlaceholderText(/input/i)).toHaveValue('Hello there!');
});
