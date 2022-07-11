import { Container, Loading } from '@nextui-org/react';

function Loader() {
  return (
    <Container data-testid="loader" display="flex" justify="center" css={{ padding: 40 }}>
      <Loading size="xl" />
    </Container>
  );
}

export default Loader;
