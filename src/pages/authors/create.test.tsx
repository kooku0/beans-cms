import {
  act, fireEvent, render, screen,
} from '@testing-library/react';

import { createAuthor } from '@/api/author';
import { CreateAuthorRequest } from '@/api/author/model';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import CreatePage from './create.page';

jest.mock('@/api/author');
jest.mock('@/components/common/sidebar/Sidebar');

describe('AuthorCreatePage', () => {
  const mockAuthor: CreateAuthorRequest = {
    name: 'mock-name',
    email: 'mock-email',
    position: 'mock-position',
    team: 'mock-team',
  };

  const renderCreatePage = () => render((
    <ReactQueryWrapper>
      <CreatePage />
    </ReactQueryWrapper>
  ));

  it('author를 생성할 수 있어야한다.', async () => {
    renderCreatePage();

    await act(async () => {
      Object.entries(mockAuthor).forEach(([key, value]) => {
        fireEvent.input(screen.getByLabelText(key), { target: { value } });
      });
      await fireEvent.submit(screen.getByRole('button'));
    });

    expect(createAuthor).toBeCalledWith(mockAuthor);
  });
});
