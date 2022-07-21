import { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import Loader from '@/components/common/Loader';
import PostEditor from '@/components/post/PostEditor';
import useFetchPost from '@/hooks/query/post/useFetchPost';
import postFormState from '@/recoil/post/form/atom';

function EditPage() {
  const setPostForm = useSetRecoilState(postFormState);

  const router = useRouter();
  const { uid } = router.query;

  const { data: post } = useFetchPost(uid as string);

  useEffect(() => {
    if (post) {
      setPostForm(post);
    }
  }, [post]);

  if (!post) {
    return <Loader />;
  }

  return <PostEditor />;
}

export default EditPage;
