import { Text } from '@nextui-org/react';

import { PostAuthorRequest } from '@/api/author/model';
import AuthorForm from '@/components/author/AuthorForm';
import useCreateAuthor from '@/hooks/query/author/useCreateAuthor';

function CreatePage() {
  const { mutate } = useCreateAuthor();

  const handleSubmit = (formData: PostAuthorRequest) => mutate(formData);

  return (
    <div>
      <Text h1>Create Author</Text>
      <AuthorForm onSubmit={handleSubmit} />
    </div>
  );
}

export default CreatePage;
