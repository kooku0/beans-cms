import { render, screen } from '@testing-library/react';

import useFetchPosts from '@/hooks/query/post/useFetchPosts';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import Posts from './Posts';

jest.mock('@/hooks/query/post/useFetchPosts');

describe('Posts', () => {
  const renderPosts = () => render((
    <ReactQueryWrapper>
      <Posts />
    </ReactQueryWrapper>
  ));

  beforeEach(() => {
    (useFetchPosts as jest.Mock).mockImplementation(() => (
      { data: given.Posts, isLoading: given.isLoading }
    ));
  });

  context('data fetching이 완료되지 않았다면', () => {
    given('isLoading', () => true);
    given('Posts', () => undefined);

    it('"loading"이 보여야 한다.', () => {
      renderPosts();

      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });
  });

  context('data fetching이 완료되었다면', () => {
    given('isLoading', () => false);
    given('Posts', () => []);

    it('PostsTable 랜더링되어야 한다.', async () => {
      renderPosts();

      expect(screen.getByLabelText('Posts table')).not.toBeNull();
    });
  });
});
