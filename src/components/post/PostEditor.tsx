import styled from '@emotion/styled';

import PostForm from './form/PostForm';
import MarkdownPreview from './MarkdownPreview';
import PostHeader from './PostHeader';

function PostEditor() {
  return (
    <Wrapper>
      <PostFormWrapper>
        <PostHeader />
        <PostForm />
      </PostFormWrapper>
      <MarkdownPreview />
    </Wrapper>
  );
}

export default PostEditor;

const Wrapper = styled.div`
  display: flex;

  & > * {
    flex-basis: 50%;
  }
`;

const PostFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
