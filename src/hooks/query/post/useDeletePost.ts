import { useMutation, useQueryClient } from 'react-query';

import { deleteAuthor } from '@/api/author';
import ApiException from '@/exceptions/ApiException';

function useDeletePost(uid: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, ApiException>(
    () => deleteAuthor(uid),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
        queryClient.invalidateQueries(['post', uid]);
      },
    },
  );

  return mutation;
}

export default useDeletePost;
