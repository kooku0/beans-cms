import {
  act, fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import axios from 'axios';

import AuthorsPage from './authors.page';

jest.mock('axios');

describe('AuthorsPage', () => {
  const axiosPost = jest.spyOn(axios, 'post');

  const renderAuthorsPage = () => render(
    <AuthorsPage />,
  );

  it('AuthorsPage가 랜더링되어야 한다.', () => {
    jest.spyOn(axios, 'get').mockResolvedValue({ data: [] });

    const { container } = renderAuthorsPage();

    expect(container).toHaveTextContent(/Authors/);
  });

  it('Authors name이 보여야 한다.', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({ data: [{ id: '123', name: 'kooku' }] });

    const { container } = renderAuthorsPage();

    await waitFor(() => expect(container).toHaveTextContent('kooku'));
  });

  it('author 를 등록할 수 있어야한다.', () => {
    const name = 'kooku';

    renderAuthorsPage();

    act(() => {
      fireEvent.change(screen.getByLabelText('name'), { target: { value: name } });
      fireEvent.click(screen.getByText('등록'));
    });

    expect(axiosPost).toBeCalledWith('/api/authors', { name });
  });
});
