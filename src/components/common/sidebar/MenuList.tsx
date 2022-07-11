import { ComponentProps, PropsWithChildren } from 'react';

import styled from '@emotion/styled';
import Icon from '@mdi/react';

import MenuItem from './MenuItem';

interface Props {
  icon?: string;
  label?: string;
  items: ComponentProps<typeof MenuItem>[];
}

function MenuList({
  icon, label, items,
}: PropsWithChildren<Props>) {
  return (
    <MenuListWrapper>
      <Label>
        {icon && <Icon path={icon} size={0.7} data-testid="icon" />}
        <span>{label}</span>
      </Label>
      <ul>
        {
          items.map((item) => (
            <MenuItem key={item.text} icon={item.icon} text={item.text} link={item.link} />
          ))
        }
      </ul>
    </MenuListWrapper>
  );
}

export default MenuList;

const MenuListWrapper = styled.div`
  margin: 24px 0;
  color: #333;
  font-weight: 400;
  font-size: 13px;

  & > ul {
    margin: 6px 12px 6px 20px;
  }
`;

const Label = styled.div`
  padding: 8px 12px 8px 20px;
  color: #9a9a9a;
  display: flex;
  align-items: center;
`;
