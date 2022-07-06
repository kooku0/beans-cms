import { mdiDelete, mdiEyeOutline, mdiPencilOutline } from '@mdi/js';
import Icon from '@mdi/react';
import {
  Col, Row, Tooltip,
} from '@nextui-org/react';

import IconButton from '@/components/common/IconButton';

function ActionsCell() {
  return (
    <Row justify="center" align="center">
      <Col css={{ d: 'flex' }}>
        <Tooltip content="View user">
          <IconButton onClick={() => console.log('View user')}>
            <Icon data-testid="details" path={mdiEyeOutline} size={1} color="#979797" />
          </IconButton>
        </Tooltip>
      </Col>
      <Col css={{ d: 'flex' }}>
        <Tooltip content="Edit user">
          <IconButton onClick={() => console.log('Edit user')}>
            <Icon data-testid="edit" path={mdiPencilOutline} size={1} color="#979797" />
          </IconButton>
        </Tooltip>
      </Col>
      <Col css={{ d: 'flex' }}>
        <Tooltip content="Delete user" color="error">
          <IconButton onClick={() => console.log('Delete user')}>
            <Icon data-testid="delete" path={mdiDelete} size={1} color="#FF0080" />
          </IconButton>
        </Tooltip>
      </Col>
    </Row>
  );
}

export default ActionsCell;
