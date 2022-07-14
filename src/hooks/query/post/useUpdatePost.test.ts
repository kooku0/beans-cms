import { act, renderHook } from '@testing-library/react-hooks';

import { updatePost } from '@/api/post';
import { UpdatePostRequest } from '@/api/post/model';
import wrapper from '@/test/ReactQueryWrapper';

import useUpdatePost from './useUpdatePost';

jest.mock('@/api/post');

describe('useUpdatePost', () => {
  const uid = 'mock-uid';
  const post: UpdatePostRequest = {
    title: 'mock-title',
  };

  const useUpdatePostHook = () => renderHook(
    () => useUpdatePost(uid), { wrapper },
  );

  beforeEach(() => {
    jest.clearAllMocks();

    (updatePost as jest.Mock).mockResolvedValue(null);
  });

  it('updatePost api가 호출되어야만 한다', async () => {
    const { result } = useUpdatePostHook();

    await act(async () => {
      await result.current.mutate(post);
    });

    expect(updatePost).toBeCalledWith(uid, post);
  });
});
