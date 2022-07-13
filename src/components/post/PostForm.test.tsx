import { act } from 'react-test-renderer';

import { fireEvent, render, screen } from '@testing-library/react';

import { postForm as initialPostForm } from '@/fixtures/post';
import postFormState from '@/recoil/post/create/atom';
import InjectTestingRecoil from '@/test/InjectTestingRecoil';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';
import RecoilObserver from '@/test/RecoilObserver';

import PostForm from './PostForm';

describe('PostForm', () => {
  const setPostForm = jest.fn();

  const renderPostForm = () => render((
    <ReactQueryWrapper>
      <InjectTestingRecoil postForm={initialPostForm}>
        <RecoilObserver node={postFormState} onChange={setPostForm} />
        <PostForm />
      </InjectTestingRecoil>
    </ReactQueryWrapper>
  ));

  it('title을 작성할 수 있어야 한다.', async () => {
    renderPostForm();

    await act(async () => {
      await fireEvent.change(screen.getByLabelText('title'), { target: { value: 'title' } });
    });

    expect(setPostForm).toHaveBeenCalledWith({ ...initialPostForm, title: 'title' });
  });

  it('contents를 작성할 수 있어야 한다.', async () => {
    renderPostForm();

    await act(async () => {
      await fireEvent.change(screen.getByLabelText('contents'), { target: { value: 'contents' } });
    });

    expect(setPostForm).toHaveBeenCalledWith({ ...initialPostForm, html: 'contents' });
  });
});
