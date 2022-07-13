import { PropsWithChildren, ReactNode } from 'react';

import { css } from '@emotion/react';
import { mdiAccount, mdiFileDocumentEdit } from '@mdi/js';
import { Container, Image, Text } from '@nextui-org/react';
import Link from 'next/link';

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
      label: 'Collections',
      items: [
        {
          icon: mdiFileDocumentEdit,
          text: 'Posts',
          link: '/posts',
        },
        {
          text: 'Image',
          link: '/images',
        },
      ],
    },
    {
      label: 'Meta',
      items: [
        {
          icon: mdiAccount,
          text: 'Authors',
          link: '/authors',
        },
      ],
    },
  ];

  return (
    <main css={css({ display: 'flex' })}>
      <Sidebar
        config={sidebarConfig}
        header={(
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={150} objectFit="cover" css={{ cursor: 'pointer' }} />
          </Link>
        )}
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
        <section css={{ marginTop: 20 }}>
          {children}
        </section>
      </Container>
    </main>
  );
}

export default Layout;
