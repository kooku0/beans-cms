import { PropsWithChildren } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Text } from '@nextui-org/react';

import Sidebar from './sidebar/Sidebar';

interface Props {
  title?: string;
}

function Layout({ title, children }: PropsWithChildren<Props>) {
  const sidebarConfig = [
    {
      text: 'Contents',
      link: '/contents',
    },
    {
      text: 'Meta',
      items: [
        {
          text: 'Authors',
          link: '/authors',
        },
      ],
    },
    {
      text: 'Images',
      link: '/images',
    },
  ];

  return (
    <main css={css({ display: 'flex' })}>
      <Sidebar
        config={sidebarConfig}
        header={<img src="/logo.png" alt="logo" />}
      />
      <Wrapper>
        {title && <Text h1>{title}</Text>}
        {children}
      </Wrapper>
    </main>
  );
}

export default Layout;

const Wrapper = styled.div`
  width: 100%;
  padding: 100px;
`;
