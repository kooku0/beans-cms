import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { useRouter } from 'next/router';

import { deletePost } from '@/api/post';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import ActionsCell from './ActionsCell';

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
jest.mock('@/api/post');

describe('ActionsCell', () => {
  const postId = 'post-id';
  const mockPush = jest.fn();

  const renderActionsCell = () => render((
    <ReactQueryWrapper>
      <ActionsCell postId={postId} />
    </ReactQueryWrapper>
  ));

  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

  describe('툴팁', () => {
    context('수정 아이콘에 마우스를 가져다 대면', () => {
      it('Edit post 툴팁이 나타난다.', async () => {
        renderActionsCell();

        fireEvent.mouseOver(screen.getByTestId('edit'));

        expect(await screen.findByText('Edit post')).toBeInTheDocument();
      });
    });

    context('삭제 아이콘에 마우스를 가져다 대면', () => {
      it('Delete post 툴팁이 나타난다.', async () => {
        renderActionsCell();

        fireEvent.mouseOver(screen.getByTestId('delete'));

        expect(await screen.findByText('Delete post')).toBeInTheDocument();
      });
    });
  });

  describe('클릭', () => {
    context('수정 아이콘을 클릭하면', () => {
      it('Post edit 페이지로 이동한다.', async () => {
        renderActionsCell();

        fireEvent.click(screen.getByTestId('edit'));

        expect(mockPush).toBeCalledWith(`/posts/${postId}/edit`);
      });
    });

    context('삭제 아이콘을 클릭하면', () => {
      it('Post가 delete 된다.', async () => {
        renderActionsCell();

        fireEvent.click(screen.getByTestId('delete'));

        await waitFor(async () => {
          await expect(deletePost).toBeCalledWith(postId);
        });
      });
    });
  });
});
