import { ComponentProps, PropsWithChildren, ReactNode } from 'react';

import styled from '@emotion/styled';

import Menu from './Menu';

interface Props {
  config: ComponentProps<typeof Menu>[];
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
        config.map(({
          link, icon, text, items,
        }) => (
          <Menu
            key={text}
            icon={icon}
            text={text}
            link={link}
            items={items}
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
  width: 320px;
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
