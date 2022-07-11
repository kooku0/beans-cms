import {
  act, fireEvent, render, screen,
} from '@testing-library/react';

import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import PostsPage from './index.page';

jest.mock('@/components/common/sidebar/Sidebar');

describe('PostsPage', () => {
  const renderPostsPage = () => render(
    <ReactQueryWrapper>
      <PostsPage />
    </ReactQueryWrapper>,
  );

  context('Create 버튼을 누르면', () => {
    it('PostCreate 페이지로 이동한다.', async () => {
      renderPostsPage();

      const button = screen.getByTestId('create-button');

      await act(async () => {
        await fireEvent.click(button);
      });

      expect(button).toHaveAttribute('href', '/posts/create');
    });
  });
});
