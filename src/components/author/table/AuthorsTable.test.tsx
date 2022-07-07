import { act, render, screen } from '@testing-library/react';

import FIXTURE_AUTHOR from '@/fixtures/author';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import AuthorsTable from './AuthorsTable';

describe('AuthorsTable', () => {
  const handlePageChange = jest.fn();

  const renderAuthorsTable = () => render((
    <ReactQueryWrapper>
      <AuthorsTable authors={given.authors} onPageChange={handlePageChange} />
    </ReactQueryWrapper>
  ));

  given('authors', () => [FIXTURE_AUTHOR]);

  it('author가 렌더되어야 한다.', () => {
    const { container } = renderAuthorsTable();

    expect(container).toHaveTextContent(FIXTURE_AUTHOR.name);
  });

  describe('pagination', () => {
    context('다른 페이지를 클릭하면', () => {
      given('authors', () => [1, 2, 3, 4].map((uid) => ({ ...FIXTURE_AUTHOR, uid })));

      it('onPageChange 함수가 호출된다.', () => {
        renderAuthorsTable();

        act(() => screen.getByText('2').click());

        expect(handlePageChange).toHaveBeenCalledWith(2);
      });
    });
  });
});
