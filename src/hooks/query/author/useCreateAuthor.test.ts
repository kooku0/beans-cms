import { act, renderHook } from '@testing-library/react-hooks';

import { createAuthor } from '@/api/author';
import { CreateAuthorRequest } from '@/api/author/model';
import wrapper from '@/test/ReactQueryWrapper';

import useCreateAuthor from './useCreateAuthor';

jest.mock('@/api/author');

describe('useCreateAuthor', () => {
  const author: CreateAuthorRequest = {
    name: 'mock-name',
  };

  const useCreateAuthorHook = () => renderHook(
    () => useCreateAuthor(), { wrapper },
  );

  beforeEach(() => {
    jest.clearAllMocks();

    (createAuthor as jest.Mock).mockResolvedValue(null);
  });

  it('createAuthor api가 호출되어야만 한다', async () => {
    const { result } = useCreateAuthorHook();

    await act(async () => {
      await result.current.mutate(author);
    });

    expect(createAuthor).toBeCalledWith(author);
  });
});
