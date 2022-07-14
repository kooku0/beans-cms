import { useMutation, useQueryClient } from 'react-query';

import { updatePost } from '@/api/post';
import { UpdatePostRequest } from '@/api/post/model';
import ApiException from '@/exceptions/ApiException';

function useUpdatePost(uid: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, ApiException, UpdatePostRequest>(
    (post) => updatePost(uid, post),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
        queryClient.invalidateQueries(['post', uid]);
      },
    },
  );

  return mutation;
}

export default useUpdatePost;
