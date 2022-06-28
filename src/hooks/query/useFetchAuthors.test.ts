import { renderHook } from '@testing-library/react-hooks';

import { fetchAuthors } from '@/api/author';
import FIXTURE_AUTHOR from '@/fixtures/author';
import wrapper from '@/test/ReactQueryWrapper';

import useFetchAuthors from './useFetchAuthors';

jest.mock('@/api/author');

describe('useFetchAuthors', () => {
  const mockResponse = [FIXTURE_AUTHOR];

  const useFetchAuthorsHook = () => renderHook(() => useFetchAuthors(), { wrapper });

  beforeEach(() => {
    jest.clearAllMocks();

    (fetchAuthors as jest.Mock).mockResolvedValue(mockResponse);
  });

  it('author 리스트를 반환해야 한다.', async () => {
    const { result, waitFor } = useFetchAuthorsHook();

    await waitFor(() => !!result.current.data);

    expect(fetchAuthors).toBeCalled();
    expect(result.current.data).toEqual(mockResponse);
  });
});
