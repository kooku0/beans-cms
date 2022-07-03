import { PropsWithChildren, useState } from 'react';
import { a, useSpring } from 'react-spring';
import { useMeasure } from 'react-use';

import styled from '@emotion/styled';
import { mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';
import { useRouter } from 'next/router';

type SubMenuConfig = {
  icon?: string;
  text: string;
  link: string;
}

interface Props {
  icon?: string;
  link?: string;
  text: string;
  items?: SubMenuConfig[];
}

function Menu({
  link, icon, text, items,
}: PropsWithChildren<Props>) {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [ref, { height: viewHeight }] = useMeasure<HTMLDivElement>();

  const { height, opacity, rotate } = useSpring({
    from: { height: 0, opacity: 0, rotate: 180 },
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
      rotate: isOpen ? 180 : 0,
    },
  });

  const handleClick = () => {
    setOpen(!isOpen);

    if (link) {
      router.push(link);
    }
  };

  return (
    <MenuWrapper onClick={handleClick}>
      <Contents>
        {icon && <img src={icon} alt="icon" />}
        {text}
        {items && <a.div style={{ rotate }}><Icon path={mdiChevronDown} size={1} /></a.div>}
      </Contents>
      <a.div style={{ opacity, height, overflow: 'hidden' }}>
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
    </MenuWrapper>
  );
}

export default Menu;

const MenuWrapper = styled.div`
  border-bottom: solid 1px black;
  cursor: pointer;

  &:hover {
    filter: brightness(0.8);
  }
`;

const Contents = styled.div`
  padding: 16px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubMenu = styled.div`
  padding: 13px 30px;
  padding-left: 16px;
  background-color: whitesmoke;
  cursor: pointer;

  &:hover {
    filter: brightness(0.8);
  }
`;
