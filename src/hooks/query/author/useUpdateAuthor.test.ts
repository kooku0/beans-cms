import { act, renderHook } from '@testing-library/react-hooks';

import { updateAuthor } from '@/api/author';
import { UpdateAuthorRequest } from '@/api/author/model';
import wrapper from '@/test/ReactQueryWrapper';

import useUpdateAuthor from './useUpdateAuthor';

jest.mock('@/api/author');

describe('useUpdateAuthor', () => {
  const uid = 'mock-uid';
  const author: UpdateAuthorRequest = {
    name: 'mock-name',
  };

  const useUpdateAuthorHook = () => renderHook(
    () => useUpdateAuthor(uid), { wrapper },
  );

  beforeEach(() => {
    jest.clearAllMocks();

    (updateAuthor as jest.Mock).mockResolvedValue(null);
  });

  it('updateAuthor api가 호출되어야만 한다', async () => {
    const { result } = useUpdateAuthorHook();

    await act(async () => {
      await result.current.mutate(author);
    });

    expect(updateAuthor).toBeCalledWith(uid, author);
  });
});
