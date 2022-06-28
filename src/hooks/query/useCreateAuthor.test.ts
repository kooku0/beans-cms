import { act, renderHook } from '@testing-library/react-hooks';

import { postAuthor } from '@/api/author';
import { PostAuthorRequest } from '@/api/author/model';
import wrapper from '@/test/ReactQueryWrapper';

import useCreateAuthor from './useCreateAuthor';

jest.mock('@/api/author');

describe('useCreateAuthor', () => {
  const author: PostAuthorRequest = {
    name: 'mock-name',
  };

  const useCreateAuthorHook = () => renderHook(
    () => useCreateAuthor(), { wrapper },
  );

  beforeEach(() => {
    jest.clearAllMocks();

    (postAuthor as jest.Mock).mockResolvedValue(null);
  });

  it('postAuthor api가 호출되어야만 한다', async () => {
    const { result } = useCreateAuthorHook();

    await act(async () => {
      await result.current.mutate(author);
    });

    expect(postAuthor).toBeCalledWith(author);
  });
});
