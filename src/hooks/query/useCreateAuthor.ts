import { useMutation } from 'react-query';

import { postAuthor } from '@/api/author';
import { PostAuthorRequest, PostAuthorResponse } from '@/api/author/model';
import ApiException from '@/exceptions/ApiException';

function useCreateAuthor() {
  const mutation = useMutation<PostAuthorResponse, ApiException, PostAuthorRequest>(
    'authors',
    (author) => postAuthor(author),
  );

  return mutation;
}

export default useCreateAuthor;
