import { fireEvent, render, screen } from '@testing-library/react';

import { postForm as initialPostForm } from '@/fixtures/post';
import postFormState from '@/recoil/post/create/atom';
import InjectTestingRecoil from '@/test/InjectTestingRecoil';
import RecoilObserver from '@/test/RecoilObserver';

import TagInput from './TagInput';

describe('TagInput', () => {
  const tagIndicators = [',', 'Enter'];

  const setPostForm = jest.fn();

  const renderTagInput = () => render((
    <InjectTestingRecoil postForm={{
      ...initialPostForm,
      tags: given.tags,
    }}
    >
      <RecoilObserver node={postFormState} onChange={setPostForm} />
      <TagInput />
    </InjectTestingRecoil>
  ));

  context('tag를 클릭하면', () => {
    given('tags', () => ['tag1', 'tag2']);

    it('tag가 삭제되어야 한다.', () => {
      renderTagInput();

      fireEvent.click(screen.getByText('tag1'));

      expect(setPostForm).toHaveBeenCalledWith({
        ...initialPostForm,
        tags: ['tag2'],
      });
      expect(screen.queryByText('tag1')).toBeNull();
    });
  });

  context('tag 입력후 tagIndicator를 입력하면', () => {
    given('tags', () => ['tag1', 'tag2']);

    tagIndicators.forEach((indicator) => {
      describe(`tagIndicator: ${indicator}`, () => {
        it('tag가 추가된다.', () => {
          renderTagInput();

          const input = screen.getByLabelText('tags');

          fireEvent.change(input, { target: { value: 'tag3' } });
          fireEvent.keyDown(input, { key: ',' });

          expect(setPostForm).toHaveBeenCalledWith({
            ...initialPostForm,
            tags: ['tag1', 'tag2', 'tag3'],
          });
          expect(screen.getByText('tag3')).toBeInTheDocument();
        });

        it('input이 clear 된다.', () => {
          renderTagInput();

          const input = screen.getByLabelText('tags');

          fireEvent.change(input, { target: { value: 'tag3' } });
          fireEvent.keyDown(input, { key: ',' });

          expect(input).toHaveValue('');
        });
      });
    });
  });
});
