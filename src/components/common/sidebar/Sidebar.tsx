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
      <nav>
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
      </nav>
      <Footer>
        {footer}
      </Footer>
    </SidebarWrapper>
  );
}

export default Sidebar;

const SidebarWrapper = styled.aside`
  width: 320px;
  height: 100vh;
  padding: 20px 0;
  background-color: #fafafa;
  border-right: 2px solid #e0e0e0;
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
