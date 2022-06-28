import {
  act, fireEvent, render, screen, waitFor, waitForElementToBeRemoved,
} from '@testing-library/react';
import axios from 'axios';

import { fetchAuthors } from '@/api/author';
import AUTHOR_FIXTURE from '@/fixtures/author';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import AuthorsPage from './authors.page';

jest.mock('@/api/author');

describe('AuthorsPage', () => {
  const axiosPost = jest.spyOn(axios, 'post');

  const renderAuthorsPage = () => render(
    <ReactQueryWrapper>
      <AuthorsPage />
    </ReactQueryWrapper>,
  );

  it('AuthorsPage가 랜더링되어야 한다.', async () => {
    (fetchAuthors as jest.Mock).mockResolvedValue({ data: [] });

    const { container } = renderAuthorsPage();

    await waitForElementToBeRemoved(screen.queryByText(/loading/));

    expect(container).toHaveTextContent(/Authors/);
  });

  it('Authors name이 보여야 한다.', async () => {
    (fetchAuthors as jest.Mock).mockResolvedValue({ data: [AUTHOR_FIXTURE] });

    const { container } = renderAuthorsPage();

    await waitForElementToBeRemoved(screen.queryByText(/loading/));

    await waitFor(() => expect(container).toHaveTextContent(AUTHOR_FIXTURE.name));
  });

  it('author 를 등록할 수 있어야한다.', () => {
    const { name } = AUTHOR_FIXTURE;

    renderAuthorsPage();

    act(() => {
      fireEvent.change(screen.getByLabelText('name'), { target: { value: name } });
      fireEvent.click(screen.getByText('등록'));
    });

    expect(axiosPost).toBeCalledWith('/api/authors', { name });
  });
});
