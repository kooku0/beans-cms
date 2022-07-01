import {
  PropsWithChildren, ReactNode, useEffect, useRef, useState,
} from 'react';
import { a, useSpring } from 'react-spring';
import { useMeasure } from 'react-use';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import ChevronDown from '@/assets/chevron-down.svg';

function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

type MenuConfig = {
  icon?: string;
  text: string;
  link: string;
  items?: SubMenuConfig[];
}

type SubMenuConfig = Omit<MenuConfig, 'items'>;

interface SidebarProps {
  config: MenuConfig[];
  header?: ReactNode;
  footer?: ReactNode;
}

function Sidebar({
  config, header, footer,
}: PropsWithChildren<SidebarProps>) {
  return (
    <div css={css`
        width: 225px;
        height: 100vh;
        padding: 20px 0;
        background-color: skyblue;
        position: relative;
      `}
    >
      {header}
      {
        config.map((menu) => (
          <Menu
            key={menu.link}
            text={menu.text}
            link={menu.link}
            items={menu.items}
          />
        ))
      }
      {footer}
    </div>
  );
}

interface MenuProps {
  link: string;
  text: string;
  items?: SubMenuConfig[];
}

function Menu({ link, text, items }: PropsWithChildren<MenuProps>) {
  const [isOpen, setOpen] = useState(false);
  const previous = usePrevious(isOpen);
  const [ref, { height: viewHeight }] = useMeasure<HTMLDivElement>();

  const { height, opacity, y } = useSpring({
    from: { height: 0, opacity: 0, y: 0 },
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
      y: isOpen ? 0 : 20,
    },
  });

  const handleClick = () => setOpen(!isOpen);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onClick={handleClick}
      css={css`
        border-bottom: solid 1px black;
    `}
    >
      <div css={css`
        padding: 16px 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}
      >
        {text}
        {items && <ChevronDown />}
      </div>
      <a.div
        style={{
          opacity,
          height: isOpen && previous === isOpen ? 'auto' : height,
          overflow: 'hidden',
        }}
      >
        <div ref={ref}>
          {
            items?.map((item) => (
              <SubMenu key={item.link}>
                {item.text}
              </SubMenu>
            ))
          }
        </div>
      </a.div>
    </div>
  );
}

const SubMenu = styled.div`
  padding: 13px 30px;
  padding-left: 16px;
  background-color: whitesmoke;
`;
const Header = styled.div``;
const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
`;

Sidebar.Header = Header;
Sidebar.Footer = Footer;

export default Sidebar;
