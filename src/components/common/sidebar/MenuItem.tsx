import { memo, useEffect, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Icon from '@mdi/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
  icon?: string;
  text: string;
  link: string;
}

function MenuItem({ icon, text, link }: Props) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (router.pathname === link) {
      setIsActive(true);
    }
  }, []);

  return (
    <Item active={isActive} role="listitem">
      <Link href={link} passHref>
        <Anchor data-testid="link">
          {icon && <Icon path={icon} size={0.7} css={css({ marginRight: 4 })} color={isActive ? '#333' : '#9a9a9a'} data-testid="icon" />}
          <span>{text}</span>
        </Anchor>
      </Link>
    </Item>
  );
}

export default memo(MenuItem);

const Item = styled.li<{ active: boolean; }>`
  cursor: pointer;
  margin: 8px 0;
  font-size: 13px;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};

  &:hover {
    text-decoration: underline;
  }
`;

const Anchor = styled.a`
  display: flex;
  align-items: center;
`;
