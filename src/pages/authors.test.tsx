import {
  act, fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import AUTHOR_FIXTURE from '@/fixtures/author';
import useCreateAuthor from '@/hooks/query/useCreateAuthor';
import useFetchAuthors from '@/hooks/query/useFetchAuthors';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import AuthorsPage from './authors.page';

jest.mock('@/hooks/query/useFetchAuthors');
jest.mock('@/hooks/query/useCreateAuthor');

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

    it('Authors name이 보여야 한다.', async () => {
      given('authors', () => [AUTHOR_FIXTURE]);

      const { container } = renderAuthorsPage();

      await waitFor(() => expect(container).toHaveTextContent(AUTHOR_FIXTURE.name));
    });

    it('author 를 등록할 수 있어야한다.', () => {
      const { name } = AUTHOR_FIXTURE;

      renderAuthorsPage();

      act(() => {
        fireEvent.change(screen.getByLabelText('name'), { target: { value: name } });
        fireEvent.click(screen.getByText('등록'));
      });

      expect(mutate).toBeCalledWith({ name });
    });
  });
});
