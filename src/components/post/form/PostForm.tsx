import { ChangeEvent, useEffect } from 'react';

import styled from '@emotion/styled';
import {
  FormElement, Input, Spacer,
} from '@nextui-org/react';
import { useRecoilState, useResetRecoilState } from 'recoil';

import postFormState from '@/recoil/post/form/atom';

import MarkdownEditor from '../markdown/MarkdownEditor';

import AuthorSelect from './AuthorSelect';
import TagInput from './TagInput';

function PostForm() {
  const resetPostForm = useResetRecoilState(postFormState);
  useEffect(() => resetPostForm, []);

  const [{ title, markdown }, setPostForm] = useRecoilState(postFormState);

  const handleTitleChange = ({ target }: ChangeEvent<FormElement>) => {
    setPostForm((prev) => ({ ...prev, title: target.value }));
  };

  const setMarkdown = (value: string) => {
    setPostForm((prev) => ({ ...prev, markdown: value }));
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
      <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />
    </Form>
  );
}

export default PostForm;

const Form = styled.form`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;
