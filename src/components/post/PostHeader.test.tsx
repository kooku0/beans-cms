import {
  act, fireEvent, render, screen,
} from '@testing-library/react';
import { useRouter } from 'next/router';

import { postForm as initialPostForm } from '@/fixtures/post';
import useCreatePost from '@/hooks/query/post/useCreatePost';
import InjectTestingRecoil from '@/test/InjectTestingRecoil';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import PostHeader from './PostHeader';

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
jest.mock('@/api/post');
jest.mock('@/hooks/query/post/useCreatePost');

describe('PostHeader', () => {
  const mockPush = jest.fn();
  const mutate = jest.fn();

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
    (useCreatePost as jest.Mock).mockImplementation(() => ({
      mutate,
      isLoading: given.isLoading,
      isSuccess: given.isSuccess,
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
    it('draft status로 mutate 메서드를 호출한다.', async () => {
      renderPostHeader();

      await act(async () => {
        await fireEvent.click(screen.getByText(/Draft/i));
      });

      expect(mutate).toHaveBeenCalledWith({
        ...initialPostForm,
        status: 'draft',
      });
    });
  });

  context('Publish 버튼을 누르면', () => {
    it('publish status로 mutate 메서드를 호출한다.', async () => {
      renderPostHeader();

      await act(async () => {
        await fireEvent.click(screen.getByText(/Publish/i));
      });

      expect(mutate).toHaveBeenCalledWith({
        ...initialPostForm,
        status: 'published',
      });
    });
  });

  context('isLoading 이 true 일 때', () => {
    given('isLoading', () => true);

    it('Draft 버튼이 disabled 상태로 보인다.', () => {
      renderPostHeader();

      expect(screen.getByRole('button', { name: /Draft/i })).toBeDisabled();
    });

    it('Publish 버튼이 disabled 상태로 보인다.', () => {
      renderPostHeader();

      expect(screen.getByRole('button', { name: /Publish/i })).toBeDisabled();
    });
  });

  context('isSuccess가 true 일 때', () => {
    given('isSuccess', () => true);

    it('/posts 로 이동한다.', async () => {
      renderPostHeader();

      await act(async () => {
        await fireEvent.click(screen.getByText(/Publish/i));
      });

      expect(mockPush).toHaveBeenCalledWith('/posts');
    });
  });
});
