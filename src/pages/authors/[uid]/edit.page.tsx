import { Text } from '@nextui-org/react';
import { useRouter } from 'next/router';

import { patchAuthor } from '@/api/author';
import { PatchAuthorRequest } from '@/api/author/model';
import AuthorForm from '@/components/author/AuthorForm';
import useFetchAuthor from '@/hooks/query/author/useFetchAuthor';

function EditPage() {
  const router = useRouter();
  const { uid } = router.query;

  const { data: author } = useFetchAuthor(uid as string);

  if (!author) {
    return <div>loading</div>;
  }

  const handleSubmit = (formData: PatchAuthorRequest) => patchAuthor(uid as string, formData);

  return (
    <div>
      <Text h1>Edit Author</Text>
      <AuthorForm author={author} onSubmit={handleSubmit} />
    </div>
  );
}

export default EditPage;
