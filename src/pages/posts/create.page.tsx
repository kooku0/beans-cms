import { useEffect } from 'react';

import { useResetRecoilState } from 'recoil';

import PostEditor from '@/components/post/PostEditor';
import postFormState from '@/recoil/post/form/atom';

function CreatePostPage() {
  const resetPostForm = useResetRecoilState(postFormState);

  useEffect(() => resetPostForm(), []);

  return <PostEditor />;
}

export default CreatePostPage;
