import React from 'react';
import AboutUs from '../components/pages/About/AboutUs';
import { render } from '@testing-library/react';

describe('About Us Page', () => {
  it('renders the component', () => {
    const { getByText } = render(<AboutUs />);

    expect(getByText(/front-end development/i)).toBeInTheDocument();
  });
});
