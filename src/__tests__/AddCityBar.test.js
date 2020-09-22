import React, { useState } from 'react';
import AutoComplete from '../components/common/AutoComplete';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('AutoComplete should have placeholder text', () => {
  const { getByPlaceholderText } = render(
    <AutoComplete
      compareList={{
        cities: [
          ['city1', 'city2'],
          ['city1', 'city2'],
        ],
        searched: false,
      }}
      setCompareList={() => {
        return 'yes';
      }}
    />
  );

  expect(getByPlaceholderText(/Tulsa/i)).toBeInTheDocument();
});

test('AutoComplete should change text', async () => {
  const { getByPlaceholderText, rerender, getByDisplayValue } = render(
    <AutoComplete
      compareList={{
        cities: [
          ['city1', 'city2'],
          ['city1', 'city2'],
        ],
        searched: false,
      }}
      setCompareList={() => {
        return 'yes';
      }}
    />
  );

  expect(getByPlaceholderText(/Tulsa/i)).toBeInTheDocument();
  await waitFor(() => {
    rerender(
      <AutoComplete
        compareList={{
          cities: [
            ['city1', 'city2'],
            ['city1', 'city2'],
          ],
          searched: false,
        }}
        setCompareList={() => {
          return 'yes';
        }}
      />
    );
  });
  fireEvent.click(getByPlaceholderText(/Tulsa/i));
  userEvent.type(getByPlaceholderText(/Tulsa/i), 'Berkeley');
  await waitFor(() => {
    rerender(
      <AutoComplete
        compareList={{
          cities: [
            ['city1', 'city2'],
            ['city1', 'city2'],
          ],
          searched: false,
        }}
        setCompareList={() => {
          return 'yes';
        }}
      />
    );
  });
  expect(getByDisplayValue(/Berkeley/i)).toBeInTheDocument();
});
