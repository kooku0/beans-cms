import { useRouter } from 'next/router';

import { UpdateAuthorRequest } from '@/api/author/model';
import AuthorForm from '@/components/author/AuthorForm';
import Layout from '@/components/common/Layout';
import useFetchAuthor from '@/hooks/query/author/useFetchAuthor';
import useUpdateAuthor from '@/hooks/query/author/useUpdateAuthor';

function EditPage() {
  const router = useRouter();
  const { uid } = router.query;

  const { data: author } = useFetchAuthor(uid as string);
  const { mutate } = useUpdateAuthor(uid as string);

  if (!author) {
    return <div>loading</div>;
  }

  const handleSubmit = (formData: UpdateAuthorRequest) => mutate(formData);

  return (
    <Layout title="Edit Author">
      <AuthorForm author={author} onSubmit={handleSubmit} />
    </Layout>
  );
}

export default EditPage;
