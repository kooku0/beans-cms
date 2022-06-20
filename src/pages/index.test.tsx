import { render } from '@testing-library/react';

import HomePage from './index.page';

describe('HomePage', () => {
  const renderHomePage = () => render(
    <HomePage />,
  );

  it('HomePage가 랜더링되어야 한다.', () => {
    const { container } = renderHomePage();

    expect(container).toHaveTextContent(/Home/);
  });
});
