import { act } from 'react-test-renderer';

import { render } from '@testing-library/react';

import FIXTURE_POST from '@/fixtures/post';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import PostsTable from './PostsTable';

jest.mock('@/api/post');

describe('PostsTable', () => {
  const renderPostsTable = () => render((
    <ReactQueryWrapper>
      <PostsTable posts={given.posts} />
    </ReactQueryWrapper>
  ));

  given('posts', () => [FIXTURE_POST]);

  it('post가 렌더되어야 한다.', async () => {
    const { container } = renderPostsTable();

    await act(async () => {
      await expect(container).toHaveTextContent(FIXTURE_POST.title);
    });
  });
});
