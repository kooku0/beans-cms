import { render, screen } from '@testing-library/react';

import Loader from './Loader';

describe('Loader', () => {
  const renderLoader = () => render((
    <Loader />
  ));

  it('should render', () => {
    renderLoader();

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
