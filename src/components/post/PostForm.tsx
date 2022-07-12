import styled from '@emotion/styled';
import { Input, Spacer } from '@nextui-org/react';

import AuthorSelect from './AuthorSelect';

function PostForm() {
  return (
    <Form>
      <Input placeholder="title" width="100%" size="xl" />
      <Spacer y={0.5} />
      <AuthorSelect />
    </Form>
  );
}

export default PostForm;

const Form = styled.form`
  padding: 16px;
`;
