import styled from '@emotion/styled';
import { RecoilRoot } from 'recoil';

import PostForm from '@/components/post/PostForm';
import PostHeader from '@/components/post/PostHeader';

function CreatePostPage() {
  return (
    <RecoilRoot>
      <Wrapper>
        <PostHeader />
        <PostForm />
      </Wrapper>
    </RecoilRoot>
  );
}

export default CreatePostPage;

const Wrapper = styled.div`
  height: 100vh;
`;
