import { Text } from '@nextui-org/react';
import { useRouter } from 'next/router';

import { PatchAuthorRequest } from '@/api/author/model';
import AuthorForm from '@/components/author/AuthorForm';
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

  const handleSubmit = (formData: PatchAuthorRequest) => mutate(formData);

  return (
    <div>
      <Text h1>Edit Author</Text>
      <AuthorForm author={author} onSubmit={handleSubmit} />
    </div>
  );
}

export default EditPage;
