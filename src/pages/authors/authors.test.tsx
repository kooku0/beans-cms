import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

import useFetchAuthors from '@/hooks/query/author/useFetchAuthors';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import AuthorsPage from './index.page';

jest.mock('@/components/common/sidebar/Sidebar');
jest.mock('@/hooks/query/author/useFetchAuthors');
jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

describe('AuthorsPage', () => {
  const mockPush = jest.fn();

  const renderAuthorsPage = () => render(
    <ReactQueryWrapper>
      <AuthorsPage />
    </ReactQueryWrapper>,
  );

  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({ push: mockPush }));
    (useFetchAuthors as jest.Mock).mockImplementation(() => ({ data: given.authors }));
  });

  given('authors', () => []);

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

  it('AuthorCreate 페이지로 이동할 수 있어야한다.', () => {
    renderAuthorsPage();

    fireEvent.click(screen.getByText(/Create/));

    expect(mockPush).toBeCalledWith('/authors/create');
  });
});
