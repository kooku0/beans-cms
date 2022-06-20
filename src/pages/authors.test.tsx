import { render } from '@testing-library/react';

import AuthorsPage from './authors.page';

describe('AuthorsPage', () => {
  const renderAuthorsPage = () => render(
    <AuthorsPage />
  );

  it('AuthorsPage가 랜더링되어야 한다.', () => {
    const { container } = renderAuthorsPage();

    expect(container).toHaveTextContent(/Authors/);
  });
});
