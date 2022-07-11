import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { Button } from '@nextui-org/react';

import Authors from '@/components/author/Authors';
import Layout from '@/components/common/Layout';

function AuthorsPage() {
  return (
    <Layout
      title="Authors"
      right={(
        <Button data-testid="create-button" auto icon={<Icon path={mdiPlus} size={1} />} href="/authors/create">
          Create
        </Button>
      )}
    >
      <Authors />
    </Layout>
  );
}

export default AuthorsPage;
