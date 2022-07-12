import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/router';

import Layout from '@/components/common/Layout';
import Posts from '@/components/post/Posts';

function PostsPage() {
  const router = useRouter();

  const handleCreate = () => router.push('/posts/create');

  return (
    <Layout
      title="Posts"
      right={(
        <Button auto icon={<Icon path={mdiPlus} size={1} />} onPress={handleCreate}>
          Create
        </Button>
      )}
    >
      <Posts />
    </Layout>
  );
}

export default PostsPage;
