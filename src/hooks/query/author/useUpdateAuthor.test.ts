import { act, renderHook } from '@testing-library/react-hooks';

import { patchAuthor } from '@/api/author';
import { PatchAuthorRequest } from '@/api/author/model';
import wrapper from '@/test/ReactQueryWrapper';

import useUpdateAuthor from './useUpdateAuthor';

jest.mock('@/api/author');

describe('useUpdateAuthor', () => {
  const uid = 'mock-uid';
  const author: PatchAuthorRequest = {
    name: 'mock-name',
  };

  const useUpdateAuthorHook = () => renderHook(
    () => useUpdateAuthor(uid), { wrapper },
  );

  beforeEach(() => {
    jest.clearAllMocks();

    (patchAuthor as jest.Mock).mockResolvedValue(null);
  });

  it('patchAuthor api가 호출되어야만 한다', async () => {
    const { result } = useUpdateAuthorHook();

    await act(async () => {
      await result.current.mutate(author);
    });

    expect(patchAuthor).toBeCalledWith(uid, author);
  });
});
