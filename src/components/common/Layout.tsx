import { PropsWithChildren, ReactNode } from 'react';

import { css } from '@emotion/react';
import { Container, Text } from '@nextui-org/react';

import Sidebar from './sidebar/Sidebar';

interface Props {
  title?: string;
  left?: ReactNode;
  right?:ReactNode;
}

function Layout({
  title, left, right, children,
}: PropsWithChildren<Props>) {
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
      <Container fluid css={({ padding: 100 })}>
        <header css={css({ display: 'flex' })}>
          <Text h1 data-testid="title">{title}</Text>
          <Container display="flex" justify="space-between" alignItems="center">
            <div>
              {left}
            </div>
            <div>
              {right}
            </div>
          </Container>
        </header>
        {children}
      </Container>
    </main>
  );
}

export default Layout;
