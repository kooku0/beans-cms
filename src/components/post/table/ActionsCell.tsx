import { mdiDelete, mdiPencilOutline } from '@mdi/js';
import Icon from '@mdi/react';
import {
  Col, Row, Tooltip,
} from '@nextui-org/react';
import { useRouter } from 'next/router';

import IconButton from '@/components/common/IconButton';
import useDeletePost from '@/hooks/query/post/useDeletePost';

interface Props {
  postId: string;
}

function ActionsCell({ postId }: Props) {
  const router = useRouter();
  const { mutate } = useDeletePost(postId);

  const handleEdit = () => router.push(`/posts/${postId}/edit`);
  const handleDelete = () => mutate();

  return (
    <Row justify="center" align="center">
      <Col css={{ d: 'flex' }}>
        <Tooltip content="Edit post">
          <IconButton onClick={handleEdit}>
            <Icon data-testid="edit" path={mdiPencilOutline} size={1} color="#979797" />
          </IconButton>
        </Tooltip>
      </Col>
      <Col css={{ d: 'flex' }}>
        <Tooltip content="Delete post" color="error">
          <IconButton onClick={handleDelete}>
            <Icon data-testid="delete" path={mdiDelete} size={1} color="#FF0080" />
          </IconButton>
        </Tooltip>
      </Col>
    </Row>
  );
}

export default ActionsCell;
