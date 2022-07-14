import { useEffect } from 'react';

import styled from '@emotion/styled';
import { mdiArrowLeft } from '@mdi/js';
import Icon from '@mdi/react';
import {
  Button, Loading, Row, Spacer,
} from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { pick } from 'underscore';

import useCreatePost from '@/hooks/query/post/useCreatePost';
import useUpdatePost from '@/hooks/query/post/useUpdatePost';
import { PostStatus } from '@/models/post';
import postFormState from '@/recoil/post/form/atom';

function PostHeader() {
  const router = useRouter();
  const postId = router?.query?.uid as string;
  const {
    mutate: create,
    isLoading: isCreateLoading,
    isSuccess: isCreateSuccess,
  } = useCreatePost();
  const {
    mutate: update,
    isLoading: isUpdateLoading,
    isSuccess: isUpdateSuccess,
  } = useUpdatePost(postId);
  const postForm = useRecoilValue(postFormState);
  const resetPostForm = useResetRecoilState(postFormState);

  const handleBack = () => router.push('/posts');
  const handleDraft = () => submitPostForm('draft');
  const handlePublish = () => submitPostForm('published');

  const submitPostForm = (status: PostStatus) => {
    if (postId) {
      update({ ...pick(postForm, 'title', 'contents', 'authorUid', 'tags'), status });
      return;
    }

    create({ ...postForm, status });
  };

  const isLoading = isCreateLoading || isUpdateLoading;
  const isSuccess = isCreateSuccess || isUpdateSuccess;

  useEffect(() => {
    if (isSuccess) {
      resetPostForm();
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
