import { render } from '@testing-library/react';

import FIXTURE_AUTHOR from '@/fixtures/author';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import AuthorsTable from './AuthorsTable';

describe('AuthorsTable', () => {
  const renderAuthorsTable = () => render((
    <ReactQueryWrapper>
      <AuthorsTable authors={given.authors} />
    </ReactQueryWrapper>
  ));

  given('authors', () => [FIXTURE_AUTHOR]);

  it('author가 렌더되어야 한다.', () => {
    const { container } = renderAuthorsTable();

    expect(container).toHaveTextContent(FIXTURE_AUTHOR.name);
  });
});
