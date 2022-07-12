import styled from '@emotion/styled';
import { mdiArrowLeft } from '@mdi/js';
import Icon from '@mdi/react';
import { Button, Row, Spacer } from '@nextui-org/react';
import { useRouter } from 'next/router';

function PostHeader() {
  const router = useRouter();

  const handleBack = () => router.push('/posts');

  return (
    <header>
      <Nav>
        <Button auto flat icon={<Icon path={mdiArrowLeft} size={1} />} onPress={handleBack}>
          Back
        </Button>
        <Row justify="flex-end" align="center">
          <Button auto flat color="warning">
            Draft
          </Button>
          <Spacer x={0.5} />
          <Button auto flat color="success">
            Publish
          </Button>
        </Row>
      </Nav>
    </header>
  );
}

export default PostHeader;

const Nav = styled.nav`
  position: sticky;
  top: 0;
  padding: 0 16px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-items: space-between;
`;
