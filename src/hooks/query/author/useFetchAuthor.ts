import { useQuery } from 'react-query';

import { fetchAuthor } from '@/api/author';
import { FetchAuthorResponse } from '@/api/author/model';
import ApiException from '@/exceptions/ApiException';

function useFetchAuthor(uid: string) {
  const query = useQuery<FetchAuthorResponse, ApiException>(['author', uid], () => fetchAuthor(uid as string), {
    enabled: !!uid,
    staleTime: 5 * 60 * 1000,
  });

  return query;
}

export default useFetchAuthor;
