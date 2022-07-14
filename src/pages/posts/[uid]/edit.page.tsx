import { useRouter } from 'next/router';

import { UpdatePostRequest } from '@/api/post/model';
import Layout from '@/components/common/Layout';
import useFetchPost from '@/hooks/query/post/useFetchPost';
import useUpdatePost from '@/hooks/query/post/useUpdatePost';

function EditPage() {
  const router = useRouter();
  const { uid } = router.query;

  const { data: post } = useFetchPost(uid as string);
  const { mutate } = useUpdatePost(uid as string);

  if (!post) {
    return <div>loading</div>;
  }

  const handleSubmit = (formData: UpdatePostRequest) => mutate(formData);

  return (
    <Layout title="Edit Author">
      {/* <AuthorForm author={post} onSubmit={handleSubmit} /> */}
    </Layout>
  );
}

export default EditPage;
