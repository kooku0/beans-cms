import { css } from '@emotion/react';
import { Button } from '@nextui-org/react';

import { Menu, Sidebar } from '@/components/Sidebar';

function HomePage() {
  return (
    <div css={css`display: flex;`}>
      <Sidebar>
        <img src="/logo.png" alt="logo" />
        <Menu label="Contents" link="/contents" />
        <Menu label="Images" link="/images" />
        <Menu label="Authors" link="/authors" />
        <Menu label="Tags" link="/tags" />
      </Sidebar>
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
