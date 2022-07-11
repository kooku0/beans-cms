import useFetchPosts from '@/hooks/query/post/useFetchPosts';
import { PostSchema } from '@/models/post';

import Loader from '../common/Loader';

import PostsTable from './table/PostsTable';

function Posts() {
  const { data: posts, isLoading } = useFetchPosts();

  if (isLoading) {
    return <Loader />;
  }

  return <PostsTable posts={posts as PostSchema[]} />;
}

export default Posts;
