import { Text } from '@nextui-org/react';
import { useRouter } from 'next/router';

import EditForm from '@/components/author/EditForm';
import useFetchAuthor from '@/hooks/query/author/useFetchAuthor';

function EditPage() {
  const router = useRouter();

  const { data: author } = useFetchAuthor(router.query.uid as string);

  if (!author) {
    return <div>loading</div>;
  }

  return (
    <div>
      <Text h1>Edit Page</Text>
      <EditForm author={author} />
    </div>
  );
}

export default EditPage;
