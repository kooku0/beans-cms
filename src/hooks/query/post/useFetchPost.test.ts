import { renderHook } from '@testing-library/react-hooks';

import { fetchPost } from '@/api/post';
import FIXTURE_POST from '@/fixtures/post';
import wrapper from '@/test/ReactQueryWrapper';

import useFetchPost from './useFetchPost';

jest.mock('@/api/author');

describe('useFetchPost', () => {
  const mockResponse = FIXTURE_POST;

  const useFetchPostHook = () => renderHook(() => useFetchPost('mock-id'), { wrapper });

  beforeEach(() => {
    jest.clearAllMocks();

    (fetchPost as jest.Mock).mockResolvedValue(mockResponse);
  });

  it('post를 반환해야 한다.', async () => {
    const { result, waitFor } = useFetchPostHook();

    await waitFor(() => !!result.current.data);

    expect(fetchPost).toBeCalled();
    expect(result.current.data).toEqual(mockResponse);
  });
});
