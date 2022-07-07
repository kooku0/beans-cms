import { useMutation, useQueryClient } from 'react-query';

import { deleteAuthor } from '@/api/author';
import ApiException from '@/exceptions/ApiException';

function useDeleteAuthor(uid: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, ApiException>(
    () => deleteAuthor(uid),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('authors');
        queryClient.invalidateQueries(['author', uid]);
      },
    },
  );

  return mutation;
}

export default useDeleteAuthor;
