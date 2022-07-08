import { PropsWithChildren } from 'react';

import styled from '@emotion/styled';
import { Text } from '@nextui-org/react';

interface Props {
  title?: string;
}

function Layout({ title, children }: PropsWithChildren<Props>) {
  return (
    <Wrapper>
      {title && <Text h1 size={48}>{title}</Text>}
      {children}
    </Wrapper>
  );
}

export default Layout;

const Wrapper = styled.div`
  width: 100%;
  padding: 100px;
`;
