import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

import { deleteAuthor } from '@/api/author';

import ActionsCell from './ActionsCell';

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
jest.mock('@/api/author');

describe('ActionsCell', () => {
  const authorId = 'author-id';
  const mockPush = jest.fn();

  const renderActionsCell = () => render((
    <ActionsCell authorId={authorId} />
  ));

  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

  describe('툴팁', () => {
    context('수정 아이콘에 마우스를 가져다 대면', () => {
      it('Edit user 툴팁이 나타난다.', async () => {
        renderActionsCell();

        fireEvent.mouseOver(screen.getByTestId('edit'));

        expect(await screen.findByText('Edit user')).toBeInTheDocument();
      });
    });

    context('삭제 아이콘에 마우스를 가져다 대면', () => {
      it('Delete user 툴팁이 나타난다.', async () => {
        renderActionsCell();

        fireEvent.mouseOver(screen.getByTestId('delete'));

        expect(await screen.findByText('Delete user')).toBeInTheDocument();
      });
    });
  });

  describe('클릭', () => {
    context('수정 아이콘을 클릭하면', () => {
      it('Author edit 페이지로 이동한다.', async () => {
        renderActionsCell();

        fireEvent.click(screen.getByTestId('edit'));

        expect(mockPush).toBeCalledWith(`/authors/${authorId}/edit`);
      });
    });

    context('삭제 아이콘을 클릭하면', () => {
      it('Author가 delete 된다.', async () => {
        renderActionsCell();

        fireEvent.click(screen.getByTestId('delete'));

        expect(deleteAuthor).toBeCalledWith(authorId);
      });
    });
  });
});
