import { ComponentProps, PropsWithChildren, ReactNode } from 'react';

import styled from '@emotion/styled';

import MenuList from './MenuList';

interface Props {
  config: ComponentProps<typeof MenuList>[];
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
            icon, label, items,
          }) => (
            <MenuList
              key={label}
              icon={icon}
              label={label}
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
  background-color: #f3f3f3;
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
