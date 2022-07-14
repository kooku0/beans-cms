import {
  act, fireEvent, render, screen,
} from '@testing-library/react';
import { useRouter } from 'next/router';

import { postForm as initialPostForm } from '@/fixtures/post';
import useCreatePost from '@/hooks/query/post/useCreatePost';
import useUpdatePost from '@/hooks/query/post/useUpdatePost';
import InjectTestingRecoil from '@/test/InjectTestingRecoil';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import PostHeader from './PostHeader';

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
jest.mock('@/api/post');
jest.mock('@/hooks/query/post/useCreatePost');
jest.mock('@/hooks/query/post/useUpdatePost');

describe('PostHeader', () => {
  const mockPush = jest.fn();
  const create = jest.fn();
  const update = jest.fn();

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
      query: {
        uid: given.uid,
      },
    }));
    (useCreatePost as jest.Mock).mockImplementation(() => ({
      mutate: create,
      isLoading: given.isLoading,
      isSuccess: given.isSuccess,
    }));
    (useUpdatePost as jest.Mock).mockImplementation(() => ({
      mutate: update,
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

  context('query.uid가 있으면', () => {
    given('uid', () => 'post-uid');

    context('Draft 버튼을 누르면', () => {
      it('draft status로 update 메서드를 호출한다.', async () => {
        renderPostHeader();

        await act(async () => {
          await fireEvent.click(screen.getByText(/Draft/i));
        });

        expect(update).toHaveBeenCalledWith({
          ...initialPostForm,
          status: 'draft',
        });
      });
    });

    context('Publish 버튼을 누르면', () => {
      it('publish status로 update 메서드를 호출한다.', async () => {
        renderPostHeader();

        await act(async () => {
          await fireEvent.click(screen.getByText(/Publish/i));
        });

        expect(update).toHaveBeenCalledWith({
          ...initialPostForm,
          status: 'published',
        });
      });
    });
  });

  context('query.uid가 없으면', () => {
    given('uid', () => undefined);

    context('Draft 버튼을 누르면', () => {
      it('draft status로 create 메서드를 호출한다.', async () => {
        renderPostHeader();

        await act(async () => {
          await fireEvent.click(screen.getByText(/Draft/i));
        });

        expect(create).toHaveBeenCalledWith({
          ...initialPostForm,
          status: 'draft',
        });
      });
    });

    context('Publish 버튼을 누르면', () => {
      it('publish status로 create 메서드를 호출한다.', async () => {
        renderPostHeader();

        await act(async () => {
          await fireEvent.click(screen.getByText(/Publish/i));
        });

        expect(create).toHaveBeenCalledWith({
          ...initialPostForm,
          status: 'published',
        });
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
