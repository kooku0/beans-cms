import { Col, Row, Text } from '@nextui-org/react';

interface Props {
  position?: string;
  team?: string;
}

function PositionCell({ position, team }: Props) {
  return (
    <Col>
      <Row>
        <Text b size={14} css={{ tt: 'capitalize' }}>
          {position}
        </Text>
      </Row>
      <Row>
        <Text b size={13} css={{ tt: 'capitalize', color: '$accents7' }}>
          {team}
        </Text>
      </Row>
    </Col>
  );
}

export default PositionCell;
