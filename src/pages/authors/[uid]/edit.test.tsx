import {
  act, fireEvent, render, screen,
} from '@testing-library/react';
import { useRouter } from 'next/router';

import { updateAuthor } from '@/api/author';
import { UpdateAuthorRequest } from '@/api/author/model';
import FIXTURE_AUTHOR from '@/fixtures/author';
import useFetchAuthor from '@/hooks/query/author/useFetchAuthor';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import EditPage from './edit.page';

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
jest.mock('@/api/author');
jest.mock('@/hooks/query/author/useFetchAuthor');
jest.mock('@/components/common/sidebar/Sidebar');

describe('AuthorEditPage', () => {
  const uid = 'mock-uid';
  const author: UpdateAuthorRequest = {
    name: 'mock-name',
    email: 'mock-email',
    position: 'mock-position',
    team: 'mock-team',
  };

  const renderEditPage = () => render((
    <ReactQueryWrapper>
      <EditPage />
    </ReactQueryWrapper>
  ));

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({ query: { uid } });
    (useFetchAuthor as jest.Mock).mockImplementation(() => ({ data: given.author }));
  });

  given('author', () => FIXTURE_AUTHOR);

  context('author fetching이 완료되지 않았다면', () => {
    given('author', () => undefined);

    it('loading이 보여야 한다.', () => {
      renderEditPage();

      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });

  context('author fetching이 완료되었다면', () => {
    it('EditPage가 랜더링되어야 한다.', async () => {
      renderEditPage();

      await act(async () => {
        await expect(screen.getByText(/Edit Author/i)).toBeInTheDocument();
      });
    });
  });

  it('author를 수정할 수 있어야한다.', async () => {
    renderEditPage();

    await act(async () => {
      Object.entries(author).forEach(([key, value]) => {
        fireEvent.input(screen.getByLabelText(key), { target: { value } });
      });
      await fireEvent.submit(screen.getByRole('button'));
    });

    expect(updateAuthor).toBeCalledWith(uid, author);
  });
});
