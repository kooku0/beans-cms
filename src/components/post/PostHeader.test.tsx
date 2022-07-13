import {
  act, fireEvent, render, screen,
} from '@testing-library/react';
import { useRouter } from 'next/router';

import { createPost } from '@/api/post';
import { postForm as initialPostForm } from '@/fixtures/post';
import InjectTestingRecoil from '@/test/InjectTestingRecoil';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import PostHeader from './PostHeader';

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
jest.mock('@/api/post');

describe('PostHeader', () => {
  const mockPush = jest.fn();

  const renderPostHeader = () => render((
    <InjectTestingRecoil postForm={initialPostForm}>
      <ReactQueryWrapper>
        <PostHeader />
      </ReactQueryWrapper>
    </InjectTestingRecoil>
  ));

  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
    }));
  });

  context('Back 버튼을 누르면', () => {
    it('/posts 로 이동한다.', () => {
      renderPostHeader();

      fireEvent.click(screen.getByText(/Back/i));

      expect(mockPush).toHaveBeenCalledWith('/posts');
    });
  });

  context('Draft 버튼을 누르면', () => {
    it('/posts 로 이동한다.', async () => {
      renderPostHeader();

      await act(async () => {
        await fireEvent.click(screen.getByText(/Draft/i));
      });

      expect(mockPush).toHaveBeenCalledWith('/posts');
    });

    it('draft status로 createPost 메서드를 호출한다.', async () => {
      renderPostHeader();

      await act(async () => {
        await fireEvent.click(screen.getByText(/Draft/i));
      });

      expect(createPost).toHaveBeenCalledWith({
        ...initialPostForm,
        status: 'draft',
      });
    });
  });

  context('Publish 버튼을 누르면', () => {
    it('/posts 로 이동한다.', async () => {
      renderPostHeader();

      await act(async () => {
        await fireEvent.click(screen.getByText(/Publish/i));
      });

      expect(mockPush).toHaveBeenCalledWith('/posts');
    });

    it('publish status로 createPost 메서드를 호출한다.', async () => {
      renderPostHeader();

      await act(async () => {
        await fireEvent.click(screen.getByText(/Publish/i));
      });

      expect(createPost).toHaveBeenCalledWith({
        ...initialPostForm,
        status: 'published',
      });
    });
  });
});
