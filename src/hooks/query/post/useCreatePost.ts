import { useMutation, useQueryClient } from 'react-query';

import { createPost } from '@/api/post';
import { CreatePostRequest, CreatePostResponse } from '@/api/post/model';
import ApiException from '@/exceptions/ApiException';

function useCreatePost() {
  const queryClient = useQueryClient();

  const mutation = useMutation<CreatePostResponse, ApiException, CreatePostRequest>(
    (post) => createPost(post),
    {
      onSuccess: () => queryClient.invalidateQueries('posts'),
    },
  );

  return mutation;
}

export default useCreatePost;
