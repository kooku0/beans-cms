import { renderHook } from '@testing-library/react-hooks';

import { fetchPosts } from '@/api/post';
import FIXTURE_POST from '@/fixtures/post';
import wrapper from '@/test/ReactQueryWrapper';

import useFetchPosts from './useFetchPosts';

jest.mock('@/api/post');

describe('useFetchPosts', () => {
  const mockResponse = [FIXTURE_POST];

  const useFetchPostsHook = () => renderHook(() => useFetchPosts(), { wrapper });

  beforeEach(() => {
    jest.clearAllMocks();

    (fetchPosts as jest.Mock).mockResolvedValue(mockResponse);
  });

  it('post 리스트를 반환해야 한다.', async () => {
    const { result, waitFor } = useFetchPostsHook();

    await waitFor(() => !!result.current.data);

    expect(fetchPosts).toBeCalled();
    expect(result.current.data).toEqual(mockResponse);
  });
});
