import { PropsWithChildren, ReactNode } from 'react';

import styled from '@emotion/styled';

import Menu from './Menu';

type MenuConfig = {
  icon?: string;
  text: string;
  link: string;
  items?: SubMenuConfig[];
}

type SubMenuConfig = Omit<MenuConfig, 'items'>;

interface Props {
  config: MenuConfig[];
  header?: ReactNode;
  footer?: ReactNode;
}

function Sidebar({
  config, header, footer,
}: PropsWithChildren<Props>) {
  return (
    <SidebarWrapper>
      <Header>
        {header}
      </Header>
      {
        config.map((menu) => (
          <Menu
            key={menu.link}
            icon={menu.icon}
            text={menu.text}
            link={menu.link}
            items={menu.items}
          />
        ))
      }
      <Footer>
        {footer}
      </Footer>
    </SidebarWrapper>
  );
}

export default Sidebar;

const SidebarWrapper = styled.div`
  width: 225px;
  height: 100vh;
  padding: 20px 0;
  background-color: skyblue;
  position: relative;
`;

const Header = styled.div`
  padding: 10px;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px;
`;
