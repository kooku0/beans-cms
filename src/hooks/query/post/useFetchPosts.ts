import { useQuery } from 'react-query';

import { fetchPosts } from '@/api/post';
import { FetchPostsResponse } from '@/api/post/model';
import ApiException from '@/exceptions/ApiException';

function useFetchPosts() {
  const query = useQuery<FetchPostsResponse, ApiException>('posts', fetchPosts, {
    staleTime: 5 * 60 * 1000,
  });

  return query;
}

export default useFetchPosts;
