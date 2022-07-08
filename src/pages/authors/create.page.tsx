import { PostAuthorRequest } from '@/api/author/model';
import AuthorForm from '@/components/author/AuthorForm';
import Layout from '@/components/common/Layout';
import useCreateAuthor from '@/hooks/query/author/useCreateAuthor';

function CreatePage() {
  const { mutate } = useCreateAuthor();

  const handleSubmit = (formData: PostAuthorRequest) => mutate(formData);

  return (
    <Layout title="Create Author">
      <AuthorForm onSubmit={handleSubmit} />
    </Layout>
  );
}

export default CreatePage;
