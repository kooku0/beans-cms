import { fireEvent, render, screen } from '@testing-library/react';

import { fetchAuthors } from '@/api/author';
import FIXTURE_AUTHOR from '@/fixtures/author';
import { postForm as initialPostForm } from '@/fixtures/post';
import postFormState from '@/recoil/post/form/atom';
import InjectTestingRecoil from '@/test/InjectTestingRecoil';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';
import RecoilObserver from '@/test/RecoilObserver';

import AuthorSelect from './AuthorSelect';

jest.mock('@/api/author');

describe('AuthorSelect', () => {
  const setPostForm = jest.fn();

  const renderAuthorSelect = () => render((
    <ReactQueryWrapper>
      <InjectTestingRecoil>
        <RecoilObserver node={postFormState} onChange={setPostForm} />
        <AuthorSelect />
      </InjectTestingRecoil>
    </ReactQueryWrapper>
  ));

  (fetchAuthors as jest.Mock).mockResolvedValue([FIXTURE_AUTHOR]);

  it('author를 선택할 수 있어야한다.', async () => {
    renderAuthorSelect();

    const input = screen.getByLabelText('author');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    await screen.findByText(FIXTURE_AUTHOR.name);
    fireEvent.click(screen.getByText(FIXTURE_AUTHOR.name));

    expect(setPostForm).toBeCalledWith({
      ...initialPostForm,
      authorUid: FIXTURE_AUTHOR.uid,
    });
  });
});
