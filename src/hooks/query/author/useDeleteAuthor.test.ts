import { act, renderHook } from '@testing-library/react-hooks';

import { deleteAuthor } from '@/api/author';
import wrapper from '@/test/ReactQueryWrapper';

import useDeleteAuthor from './useDeleteAuthor';

jest.mock('@/api/author');

describe('useDeleteAuthor', () => {
  const uid = 'mock-uid';

  const useDeleteAuthorHook = () => renderHook(
    () => useDeleteAuthor(uid), { wrapper },
  );

  beforeEach(() => {
    jest.clearAllMocks();

    (deleteAuthor as jest.Mock).mockResolvedValue(null);
  });

  it('deleteAuthor api가 호출되어야만 한다', async () => {
    const { result } = useDeleteAuthorHook();

    await act(async () => {
      await result.current.mutate();
    });

    expect(deleteAuthor).toBeCalledWith(uid);
  });
});
