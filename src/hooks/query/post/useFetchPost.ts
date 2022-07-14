import { useQuery } from 'react-query';

import { fetchPost } from '@/api/post';
import { FetchPostResponse } from '@/api/post/model';
import ApiException from '@/exceptions/ApiException';

function useFetchPost(uid: string) {
  const query = useQuery<FetchPostResponse, ApiException>(['post', uid], () => fetchPost(uid as string), {
    enabled: !!uid,
    staleTime: 5 * 60 * 1000,
  });

  return query;
}

export default useFetchPost;
