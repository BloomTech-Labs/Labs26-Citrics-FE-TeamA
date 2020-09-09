import React from 'react';
import { render, act, cleanup } from '@testing-library/react';

import ExampleListContainer from '../components/pages/ExampleList/ExampleListContainer';

afterEach(cleanup);

describe('<ExampleListContainer /> test suite', () => {
  test('container renders without crashing', async () => {
    await act(async () => {
      await render(<ExampleListContainer />);
    });
  });
});
