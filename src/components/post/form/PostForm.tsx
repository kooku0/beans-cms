import { ChangeEvent } from 'react';

import styled from '@emotion/styled';
import {
  FormElement, Input, Spacer, Textarea,
} from '@nextui-org/react';
import { useRecoilState } from 'recoil';

import postFormState from '@/recoil/post/form/atom';

import AuthorSelect from './AuthorSelect';
import TagInput from './TagInput';

function PostForm() {
  const [{ title, contents }, setPostForm] = useRecoilState(postFormState);

  const handleTitleChange = ({ target }: ChangeEvent<FormElement>) => {
    setPostForm((prev) => ({ ...prev, title: target.value }));
  };

  const handleContentsChange = ({ target }: ChangeEvent<FormElement>) => {
    setPostForm((prev) => ({ ...prev, contents: target.value }));
  };

  return (
    <Form>
      <Input
        aria-label="title"
        bordered
        fullWidth
        color="primary"
        placeholder="title"
        size="xl"
        animated={false}
        value={title}
        onChange={handleTitleChange}
      />
      <Spacer y={0.5} />
      <AuthorSelect />
      <Spacer y={0.5} />
      <TagInput />
      <Spacer y={0.5} />
      <Textarea
        aria-label="contents"
        autoComplete="off"
        fullWidth
        placeholder="Enter contents"
        shadow={false}
        animated={false}
        value={contents}
        onChange={handleContentsChange}
      />
    </Form>
  );
}

export default PostForm;

const Form = styled.form`
  padding: 16px;
  height: 100%;
`;
