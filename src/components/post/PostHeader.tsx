import { useEffect } from 'react';

import styled from '@emotion/styled';
import { mdiArrowLeft } from '@mdi/js';
import Icon from '@mdi/react';
import {
  Button, Loading, Row, Spacer,
} from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import useCreatePost from '@/hooks/query/post/useCreatePost';
import postFormState from '@/recoil/post/create/atom';

function PostHeader() {
  const router = useRouter();
  const { mutate, isLoading, isSuccess } = useCreatePost();
  const postForm = useRecoilValue(postFormState);

  const handleBack = () => router.push('/posts');

  const handleDraft = () => mutate({ ...postForm, status: 'draft' });

  const handlePublish = () => mutate({ ...postForm, status: 'published' });

  useEffect(() => {
    if (isSuccess) {
      router.push('/posts');
    }
  }, [isSuccess]);

  return (
    <Header>
      <Button auto light icon={<Icon path={mdiArrowLeft} size={1} />} onPress={handleBack}>
        Back
      </Button>
      <Row justify="flex-end" align="center">
        <Button auto ghost color="warning" onPress={handleDraft} disabled={isLoading}>
          Draft
          {isLoading && <StyledLoader color="currentColor" size="sm" />}
        </Button>
        <Spacer x={0.5} />
        <Button auto ghost color="success" onPress={handlePublish} disabled={isLoading}>
          Publish
          {isLoading && <StyledLoader color="currentColor" size="sm" />}
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

const StyledLoader = styled(Loading)`
  padding-left: 10px;
`;
