import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

import ActionsCell from './ActionsCell';

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

describe('ActionsCell', () => {
  const authorId = 'author-id';
  const spyOnConsoleLog = jest.spyOn(console, 'log');
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
      it('Edit user 이 출력된다.', async () => {
        renderActionsCell();

        fireEvent.click(screen.getByTestId('edit'));

        expect(mockPush).toBeCalledWith(`/authors/${authorId}/edit`);
      });
    });

    context('삭제 아이콘을 클릭하면', () => {
      it('Delete user 이 출력된다.', async () => {
        renderActionsCell();

        fireEvent.click(screen.getByTestId('delete'));

        expect(spyOnConsoleLog).toBeCalledWith('Delete user');
      });
    });
  });
});
