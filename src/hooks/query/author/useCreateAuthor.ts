import { useMutation, useQueryClient } from 'react-query';

import { createAuthor } from '@/api/author';
import { CreateAuthorRequest, CreateAuthorResponse } from '@/api/author/model';
import ApiException from '@/exceptions/ApiException';

function useCreateAuthor() {
  const queryClient = useQueryClient();

  const mutation = useMutation<CreateAuthorResponse, ApiException, CreateAuthorRequest>(
    (author) => createAuthor(author),
    {
      onSuccess: () => queryClient.invalidateQueries('authors'),
    },
  );

  return mutation;
}

export default useCreateAuthor;
