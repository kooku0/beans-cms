import {
  act, fireEvent, render, screen,
} from '@testing-library/react';
import { useRouter } from 'next/router';

import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import PostsPage from './index.page';

jest.mock('@/api/post');
jest.mock('@/components/common/sidebar/Sidebar');
jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

describe('PostsPage', () => {
  const mockPush = jest.fn();

  const renderPostsPage = () => render(
    <ReactQueryWrapper>
      <PostsPage />
    </ReactQueryWrapper>,
  );

  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({ push: mockPush }));
  });

  context('Create 버튼을 누르면', () => {
    it('PostCreate 페이지로 이동한다.', async () => {
      renderPostsPage();

      await act(async () => {
        await fireEvent.click(screen.getByText(/Create/i));
      });

      expect(mockPush).toBeCalledWith('/posts/create');
    });
  });
});
