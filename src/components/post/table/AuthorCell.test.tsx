import { render } from '@testing-library/react';

import FIXTURE_AUTHOR from '@/fixtures/author';
import useFetchAuthors from '@/hooks/query/author/useFetchAuthors';

import AuthorCell from './AuthorCell';

jest.mock('@/hooks/query/author/useFetchAuthors');

describe('AuthorCell', () => {
  const authorUid = 'author-uid';

  const renderAuthorCell = () => render((
    <AuthorCell authorUid={authorUid} />
  ));

  beforeEach(() => {
    (useFetchAuthors as jest.Mock).mockImplementation(() => ({
      data: given.data,
    }));
  });

  context('props로 넘겨받은 uid를 가진 author가 없으면', () => {
    given('data', () => []);

    it('"Not Found Author" 문구가 보여야 한다.', () => {
      const { container } = renderAuthorCell();

      expect(container).toHaveTextContent(/Not Found Author/i);
    });
  });

  context('props로 넘겨받은 uid를 가진 author가 있으면', () => {
    given('data', () => [{
      ...FIXTURE_AUTHOR,
      uid: authorUid,
    }]);

    it('Author name이 보여야 한다.', () => {
      const { container } = renderAuthorCell();

      expect(container).toHaveTextContent(FIXTURE_AUTHOR.name);
    });
  });
});
