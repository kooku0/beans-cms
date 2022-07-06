import { renderHook } from '@testing-library/react-hooks';

import { fetchAuthor } from '@/api/author';
import FIXTURE_AUTHOR from '@/fixtures/author';
import wrapper from '@/test/ReactQueryWrapper';

import useFetchAuthor from './useFetchAuthor';

jest.mock('@/api/author');

describe('useFetchAuthor', () => {
  const mockResponse = FIXTURE_AUTHOR;

  const useFetchAuthorHook = () => renderHook(() => useFetchAuthor('mock-id'), { wrapper });

  beforeEach(() => {
    jest.clearAllMocks();

    (fetchAuthor as jest.Mock).mockResolvedValue(mockResponse);
  });

  it('author를 반환해야 한다.', async () => {
    const { result, waitFor } = useFetchAuthorHook();

    await waitFor(() => !!result.current.data);

    expect(fetchAuthor).toBeCalled();
    expect(result.current.data).toEqual(mockResponse);
  });
});
