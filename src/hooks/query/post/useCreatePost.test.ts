import { act, renderHook } from '@testing-library/react-hooks';

import { createPost } from '@/api/post';
import { CreatePostRequest } from '@/api/post/model';
import wrapper from '@/test/ReactQueryWrapper';

import useCreatePost from './useCreatePost';

jest.mock('@/api/post');

describe('useCreatePost', () => {
  const post: CreatePostRequest = {
    authorUid: 'mock-author-uid',
    title: 'mock-title',
    status: 'draft',
    html: 'mock-html',
    tags: ['mock-tag'],
  };

  const useCreatePostHook = () => renderHook(
    () => useCreatePost(), { wrapper },
  );

  beforeEach(() => {
    jest.clearAllMocks();

    (createPost as jest.Mock).mockResolvedValue(null);
  });

  it('createPost api가 호출되어야만 한다', async () => {
    const { result } = useCreatePostHook();

    await act(async () => {
      await result.current.mutate(post);
    });

    expect(createPost).toBeCalledWith(post);
  });
});
