import React from 'react';
import AddCityBar from '../components/common/AddCityBar';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import cityData from '../api/cityData';
const res = [
  {
    city: 'New York',
    state: 'NY',
    bedroom_size: 'Studio',
    price_2020_08: 1864,
  },
  { city: 'New York', state: 'NY', bedroom_size: '1br', price_2020_08: 2070 },
  {
    city: 'Los Angeles',
    state: 'CA',
    bedroom_size: 'Studio',
    price_2020_08: 1138,
  },
  {
    city: 'Los Angeles',
    state: 'CA',
    bedroom_size: '1br',
    price_2020_08: 1354,
  },
  { city: 'Chicago', state: 'IL', bedroom_size: 'Studio', price_2020_08: 939 },
  { city: 'Chicago', state: 'IL', bedroom_size: '1br', price_2020_08: 1090 },
  { city: 'Houston', state: 'TX', bedroom_size: 'Studio', price_2020_08: 737 },
  { city: 'Houston', state: 'TX', bedroom_size: '1br', price_2020_08: 835 },
  {
    city: 'Philadelphia',
    state: 'PA',
    bedroom_size: 'Studio',
    price_2020_08: 824,
  },
  {
    city: 'Philadelphia',
    state: 'PA',
    bedroom_size: '1br',
    price_2020_08: 978,
  },
  { city: 'Phoenix', state: 'AZ', bedroom_size: 'Studio', price_2020_08: 731 },
  { city: 'Phoenix', state: 'AZ', bedroom_size: '1br', price_2020_08: 888 },
  {
    city: 'San Antonio',
    state: 'TX',
    bedroom_size: 'Studio',
    price_2020_08: 697,
  },
  { city: 'San Antonio', state: 'TX', bedroom_size: '1br', price_2020_08: 859 },
  {
    city: 'San Diego',
    state: 'CA',
    bedroom_size: 'Studio',
    price_2020_08: 1421,
  },
  { city: 'San Diego', state: 'CA', bedroom_size: '1br', price_2020_08: 1574 },
  { city: 'Dallas', state: 'TX', bedroom_size: 'Studio', price_2020_08: 763 },
  { city: 'Dallas', state: 'TX', bedroom_size: '1br', price_2020_08: 909 },
  {
    city: 'San Jose',
    state: 'CA',
    bedroom_size: 'Studio',
    price_2020_08: 1771,
  },
  { city: 'San Jose', state: 'CA', bedroom_size: '1br', price_2020_08: 2082 },
  {
    city: 'Indianapolis',
    state: 'IN',
    bedroom_size: 'Studio',
    price_2020_08: 614,
  },
  {
    city: 'Indianapolis',
    state: 'IN',
    bedroom_size: '1br',
    price_2020_08: 713,
  },
  {
    city: 'Jacksonville',
    state: 'FL',
    bedroom_size: 'Studio',
    price_2020_08: 703,
  },
  {
    city: 'Jacksonville',
    state: 'FL',
    bedroom_size: '1br',
    price_2020_08: 902,
  },
  {
    city: 'San Francisco',
    state: 'CA',
    bedroom_size: 'Studio',
    price_2020_08: 1914,
  },
  {
    city: 'San Francisco',
    state: 'CA',
    bedroom_size: '1br',
    price_2020_08: 2353,
  },
  { city: 'Austin', state: 'TX', bedroom_size: 'Studio', price_2020_08: 968 },
  { city: 'Austin', state: 'TX', bedroom_size: '1br', price_2020_08: 1173 },
  { city: 'Columbus', state: 'OH', bedroom_size: 'Studio', price_2020_08: 641 },
  { city: 'Columbus', state: 'OH', bedroom_size: '1br', price_2020_08: 758 },
  {
    city: 'Fort Worth',
    state: 'TX',
    bedroom_size: 'Studio',
    price_2020_08: 784,
  },
  { city: 'Fort Worth', state: 'TX', bedroom_size: '1br', price_2020_08: 935 },
  {
    city: 'Charlotte',
    state: 'NC',
    bedroom_size: 'Studio',
    price_2020_08: 886,
  },
  { city: 'Charlotte', state: 'NC', bedroom_size: '1br', price_2020_08: 980 },
  { city: 'Detroit', state: 'MI', bedroom_size: 'Studio', price_2020_08: 574 },
];
jest.mock('../api/cityData');
test('AddCityBar should have placeholder text', () => {
  const { getByPlaceholderText } = render(<AddCityBar />);

  expect(getByPlaceholderText(/Search city/i)).toBeInTheDocument();
});
test('Should add text to the input', async () => {
  const { debug, rerender, getByDisplayValue, getByPlaceholderText } = render(
    <AddCityBar />
  );

  cityData.mockResolvedValueOnce(res);
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
