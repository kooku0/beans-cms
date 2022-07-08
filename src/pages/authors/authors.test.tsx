import { render } from '@testing-library/react';

import useFetchAuthors from '@/hooks/query/author/useFetchAuthors';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import AuthorsPage from './index.page';

jest.mock('@/components/common/sidebar/Sidebar');
jest.mock('@/hooks/query/author/useFetchAuthors');

describe('AuthorsPage', () => {
  const renderAuthorsPage = () => render(
    <ReactQueryWrapper>
      <AuthorsPage />
    </ReactQueryWrapper>,
  );

  beforeEach(() => {
    (useFetchAuthors as jest.Mock).mockImplementation(() => ({ data: given.authors }));
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
