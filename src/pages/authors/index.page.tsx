import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/router';

import Authors from '@/components/author/Authors';
import Layout from '@/components/common/Layout';

function AuthorsPage() {
  const router = useRouter();

  const handleCreate = () => router.push('/authors/create');

  return (
    <Layout
      title="Authors"
      right={(
        <Button auto icon={<Icon path={mdiPlus} size={1} />} onPress={handleCreate}>
          Create
        </Button>
      )}
    >
      <Authors />
    </Layout>
  );
}

export default AuthorsPage;
