import { useMutation, useQueryClient } from 'react-query';

import { postAuthor } from '@/api/author';
import { PostAuthorRequest, PostAuthorResponse } from '@/api/author/model';
import ApiException from '@/exceptions/ApiException';

function useCreateAuthor() {
  const queryClient = useQueryClient();

  const mutation = useMutation<PostAuthorResponse, ApiException, PostAuthorRequest>(
    (author) => postAuthor(author),
    {
      onSuccess: () => queryClient.invalidateQueries('authors'),
    },
  );

  return mutation;
}

export default useCreateAuthor;
