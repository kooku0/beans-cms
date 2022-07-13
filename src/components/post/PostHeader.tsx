import styled from '@emotion/styled';
import { mdiArrowLeft } from '@mdi/js';
import Icon from '@mdi/react';
import { Button, Row, Spacer } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import useCreatePost from '@/hooks/query/post/useCreatePost';
import postFormState from '@/recoil/post/create/atom';

function PostHeader() {
  const router = useRouter();
  const { mutate } = useCreatePost();
  const postForm = useRecoilValue(postFormState);

  const handleBack = () => router.push('/posts');

  const handleDraft = () => {
    mutate({ ...postForm, status: 'draft' });
    router.push('/posts');
  };

  const handlePublish = () => {
    mutate({ ...postForm, status: 'published' });
    router.push('/posts');
  };

  return (
    <Header>
      <Button auto light icon={<Icon path={mdiArrowLeft} size={1} />} onPress={handleBack}>
        Back
      </Button>
      <Row justify="flex-end" align="center">
        <Button auto flat color="warning" onPress={handleDraft}>
          Draft
        </Button>
        <Spacer x={0.5} />
        <Button auto flat color="success" onPress={handlePublish}>
          Publish
        </Button>
      </Row>
    </Header>
  );
}

export default PostHeader;

const Header = styled.header`
  position: sticky;
  top: 0;
  padding: 0 16px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-items: space-between;
  background-color: #eee;
`;
