import { fireEvent, render, screen } from '@testing-library/react';

import ActionsCell from './ActionsCell';

describe('ActionsCell', () => {
  const spyOnConsoleLog = jest.spyOn(console, 'log');

  const renderActionsCell = () => render((
    <ActionsCell />
  ));

  describe('툴팁', () => {
    context('상세 아이콘에 마우스를 가져다 대면', () => {
      it('View user 툴팁이 나타난다.', async () => {
        renderActionsCell();

        fireEvent.mouseOver(screen.getByTestId('details'));

        expect(await screen.findByText('View user')).toBeInTheDocument();
      });
    });

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
    context('상세 아이콘을 클릭하면', () => {
      it('View user 이 출력된다.', async () => {
        renderActionsCell();

        fireEvent.click(screen.getByTestId('details'));

        expect(spyOnConsoleLog).toBeCalledWith('View user');
      });
    });

    context('수정 아이콘을 클릭하면', () => {
      it('Edit user 이 출력된다.', async () => {
        renderActionsCell();

        fireEvent.click(screen.getByTestId('edit'));

        expect(spyOnConsoleLog).toBeCalledWith('Edit user');
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
