import { css } from '@emotion/react';
import { Button } from '@nextui-org/react';

import Sidebar from '@/components/sidebar/Sidebar';

function HomePage() {
  const sidebarConfig = [
    {
      text: 'Contents',
      link: '/contents',
      items: [
        {
          text: 'Authors',
          link: '/meta/authors',
        },
      ],
    },
    {
      text: 'Meta',
      link: '/meta',
      items: [
        {
          text: 'Authors',
          link: '/meta/authors',
        },
      ],
    },
    {
      text: 'Images',
      link: '/images',
    },
  ];

  return (
    <div css={css`display: flex;`}>
      <Sidebar
        config={sidebarConfig}
        header={<img src="/logo.png" alt="logo" />}
      />
      <main>
        <div>
          Home
        </div>
        <Button>버튼</Button>
      </main>
    </div>
  );
}

export default HomePage;
