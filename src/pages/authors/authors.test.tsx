import { render } from '@testing-library/react';

import useCreateAuthor from '@/hooks/query/author/useCreateAuthor';
import useFetchAuthors from '@/hooks/query/author/useFetchAuthors';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import AuthorsPage from './index.page';

jest.mock('@/hooks/query/author/useFetchAuthors');
jest.mock('@/hooks/query/author/useCreateAuthor');

describe('AuthorsPage', () => {
  const renderAuthorsPage = () => render(
    <ReactQueryWrapper>
      <AuthorsPage />
    </ReactQueryWrapper>,
  );

  const mutate = jest.fn();

  beforeEach(() => {
    (useFetchAuthors as jest.Mock).mockImplementation(() => ({ data: given.authors }));
    (useCreateAuthor as jest.Mock).mockReturnValue({ mutate });
  });

  context('data fetching이 완료되지 않았다면', () => {
    given('authors', () => undefined);

    it('"loading"이 보여야 한다.', () => {
      const { container } = renderAuthorsPage();

      expect(container).toHaveTextContent(/loading/);
    });
  });

  context('data fetching이 완료되었다면', () => {
    given('authors', () => []);

    it('AuthorsPage가 랜더링되어야 한다.', () => {
      const { container } = renderAuthorsPage();

      expect(container).toHaveTextContent(/Authors/);
    });
  });
});
