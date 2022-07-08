import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/router';

import AuthorsTable from '@/components/author/table/AuthorsTable';
import Layout from '@/components/common/Layout';
import useFetchAuthors from '@/hooks/query/author/useFetchAuthors';

function AuthorsPage() {
  const router = useRouter();
  const { data: authors } = useFetchAuthors();

  const handleCreate = () => router.push('/authors/create');

  if (!authors) {
    return <div>loading</div>;
  }

  return (
    <Layout
      title="Authors"
      right={(
        <Button auto icon={<Icon path={mdiPlus} size={1} />} onPress={handleCreate}>
          Create
        </Button>
      )}
    >
      <AuthorsTable authors={authors} />
    </Layout>
  );
}

export default AuthorsPage;
