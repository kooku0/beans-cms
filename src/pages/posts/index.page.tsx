import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { Button } from '@nextui-org/react';

import Layout from '@/components/common/Layout';
import Posts from '@/components/post/Posts';

function PostsPage() {
  return (
    <Layout
      title="Posts"
      right={(
        <Button data-testid="create-button" auto icon={<Icon path={mdiPlus} size={1} />} href="/posts/create">
          Create
        </Button>
      )}
    >
      <Posts />
    </Layout>
  );
}

export default PostsPage;
