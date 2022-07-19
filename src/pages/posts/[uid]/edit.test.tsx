import {
  act, fireEvent, render, screen,
} from '@testing-library/react';
import { useRouter } from 'next/router';

import { updatePost } from '@/api/post';
import { UpdatePostRequest } from '@/api/post/model';
import FIXTURE_POST from '@/fixtures/post';
import useFetchPost from '@/hooks/query/post/useFetchPost';
import InjectTestingRecoil from '@/test/InjectTestingRecoil';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import EditPage from './edit.page';

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
jest.mock('@/api/post');
jest.mock('@/hooks/query/post/useFetchPost');
jest.mock('@/components/post/MarkdownPreview');

describe('PostEditPage', () => {
  const uid = 'mock-uid';
  const post: UpdatePostRequest = {
    title: FIXTURE_POST.title,
    markdown: FIXTURE_POST.markdown,
    authorUid: FIXTURE_POST.authorUid,
    tags: FIXTURE_POST.tags,
  };

  const renderEditPage = () => render((
    <ReactQueryWrapper>
      <InjectTestingRecoil>
        <EditPage />
      </InjectTestingRecoil>
    </ReactQueryWrapper>
  ));

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({ query: { uid }, push: jest.fn() });
    (useFetchPost as jest.Mock).mockImplementation(() => ({ data: given.post }));
  });

  given('post', () => FIXTURE_POST);

  context('post fetching이 완료되지 않았다면', () => {
    given('post', () => undefined);

    it('loader가 보여야 한다.', () => {
      renderEditPage();

      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });
  });

  context('post fetching이 완료되었다면', () => {
    it('EditPage가 랜더링되어야 한다.', async () => {
      renderEditPage();

      await act(async () => {
        await expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
      });
    });
  });

  it('post를 수정할 수 있어야한다.', async () => {
    renderEditPage();

    await act(async () => {
      await fireEvent.click(screen.getByRole('button', { name: /Draft/i }));
    });

    expect(updatePost).toBeCalledWith(uid, { ...post, status: 'draft' });
  });
});
