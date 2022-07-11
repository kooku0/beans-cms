import { useMutation, useQueryClient } from 'react-query';

import { deletePost } from '@/api/post';
import ApiException from '@/exceptions/ApiException';

function useDeletePost(uid: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, ApiException>(
    () => deletePost(uid),
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
