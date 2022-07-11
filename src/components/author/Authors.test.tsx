import { render, screen } from '@testing-library/react';

import useFetchAuthors from '@/hooks/query/author/useFetchAuthors';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import Authors from './Authors';

jest.mock('@/hooks/query/author/useFetchAuthors');

describe('Authors', () => {
  const renderAuthors = () => render((
    <ReactQueryWrapper>
      <Authors />
    </ReactQueryWrapper>
  ));

  beforeEach(() => {
    (useFetchAuthors as jest.Mock).mockImplementation(() => (
      { data: given.authors, isLoading: given.isLoading }
    ));
  });

  context('data fetching이 완료되지 않았다면', () => {
    given('isLoading', () => true);
    given('authors', () => undefined);

    it('"loading"이 보여야 한다.', () => {
      renderAuthors();

      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });
  });

  context('data fetching이 완료되었다면', () => {
    given('isLoading', () => false);
    given('authors', () => []);

    it('AuthorsTable 랜더링되어야 한다.', async () => {
      renderAuthors();

      expect(screen.getByLabelText('Authors table')).not.toBeNull();
    });
  });
});
