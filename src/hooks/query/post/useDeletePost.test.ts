import { act, renderHook } from '@testing-library/react-hooks';

import { deletePost } from '@/api/post';
import wrapper from '@/test/ReactQueryWrapper';

import useDeletePost from './useDeletePost';

jest.mock('@/api/post');

describe('useDeletePost', () => {
  const uid = 'mock-uid';

  const useDeletePostHook = () => renderHook(
    () => useDeletePost(uid), { wrapper },
  );

  beforeEach(() => {
    jest.clearAllMocks();

    (deletePost as jest.Mock).mockResolvedValue(null);
  });

  it('deletePost api가 호출되어야만 한다', async () => {
    const { result } = useDeletePostHook();

    await act(async () => {
      await result.current.mutate();
    });

    expect(deletePost).toBeCalledWith(uid);
  });
});
