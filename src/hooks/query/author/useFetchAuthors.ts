import { useQuery } from 'react-query';

import { fetchAuthors } from '@/api/author';
import { FetchAuthorsResponse } from '@/api/author/model';
import ApiException from '@/exceptions/ApiException';

function useFetchAuthors() {
  const query = useQuery<FetchAuthorsResponse, ApiException>('authors', fetchAuthors, {
    staleTime: 5 * 60 * 1000,
  });

  return query;
}

export default useFetchAuthors;
