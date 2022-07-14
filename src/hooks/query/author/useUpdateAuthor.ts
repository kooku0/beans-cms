import { useMutation, useQueryClient } from 'react-query';

import { patchAuthor } from '@/api/author';
import { UpdateAuthorRequest } from '@/api/author/model';
import ApiException from '@/exceptions/ApiException';

function useUpdateAuthor(uid: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, ApiException, UpdateAuthorRequest>(
    (author) => patchAuthor(uid, author),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('authors');
        queryClient.invalidateQueries(['author', uid]);
      },
    },
  );

  return mutation;
}

export default useUpdateAuthor;
