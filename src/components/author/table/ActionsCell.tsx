import { mdiDelete, mdiPencilOutline } from '@mdi/js';
import Icon from '@mdi/react';
import {
  Col, Row, Tooltip,
} from '@nextui-org/react';
import { useRouter } from 'next/router';

import IconButton from '@/components/common/IconButton';
import useDeleteAuthor from '@/hooks/query/author/useDeleteAuthor';

interface Props {
  authorId: string;
}

function ActionsCell({ authorId }: Props) {
  const router = useRouter();
  const { mutate } = useDeleteAuthor(authorId);

  const handleEdit = () => router.push(`/authors/${authorId}/edit`);
  const handleDelete = () => mutate();

  return (
    <Row justify="center" align="center">
      <Col css={{ d: 'flex' }}>
        <Tooltip content="Edit user">
          <IconButton onClick={handleEdit}>
            <Icon data-testid="edit" path={mdiPencilOutline} size={1} color="#979797" />
          </IconButton>
        </Tooltip>
      </Col>
      <Col>
        <Tooltip content="Delete user" color="error">
          <IconButton onClick={handleDelete}>
            <Icon data-testid="delete" path={mdiDelete} size={1} color="#FF0080" />
          </IconButton>
        </Tooltip>
      </Col>
    </Row>
  );
}

export default ActionsCell;
