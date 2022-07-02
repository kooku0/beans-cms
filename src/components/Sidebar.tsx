import {
  createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useMemo, useState,
} from 'react';

import { css } from '@emotion/react';

type TSideBarContext = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const SidebarContext = createContext<TSideBarContext | null>(null);
const useSidebarContext = () => useContext(SidebarContext);

export function Sidebar({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(() => ({ isOpen, setIsOpen }), []);

  return (
    <SidebarContext.Provider value={value}>
      <div css={css`
        width: 225px;
        height: 100vh;
        padding: 20px 0;
        background-color: skyblue;
      `}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

interface MenuProps {
  link: string;
  label: string;
}

export function Menu({ children, link, label }: PropsWithChildren<MenuProps>) {
  const { isOpen } = useSidebarContext() as TSideBarContext;

  const handleClickMenu = () => window.open(link);

  return (
    <div onClick={handleClickMenu}>
      <div>{label}</div>
      <div>{children}</div>
    </div>
  );
}
