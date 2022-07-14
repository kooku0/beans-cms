import { useEffect } from 'react';

import { useResetRecoilState } from 'recoil';

import PostForm from '@/components/post/form/PostForm';
import PostHeader from '@/components/post/PostHeader';
import postFormState from '@/recoil/post/form/atom';

function CreatePostPage() {
  const resetPostForm = useResetRecoilState(postFormState);

  useEffect(() => resetPostForm(), []);

  return (
    <div>
      <PostHeader />
      <PostForm />
    </div>
  );
}

export default CreatePostPage;
