import styled from '@emotion/styled';

interface Props {
  bg?: string;
  color?: string;
  bordered?: boolean;
}

const Badge = styled.span<Props>`
  display: inline-block;
  text-transform: uppercase;
  padding: 0.25rem 0.375rem;
  margin: 0 2px;
  font-size: 10px;
  font-weight: bold;
  border-radius: 14px;
  letter-spacing: 0.6px;
  line-height: 1;
  box-shadow: 1px 2px 5px 0px rgb(0 0 0 / 5%);
  align-items: center;
  align-self: center;
  background-color: ${({ bordered, bg }) => (bordered ? 'transparent' : (bg || '#042F14'))};
  color: ${({ color }) => color || '#41EC8B'};

  ${({ bordered, color }) => bordered && `border: 1px solid ${color};`}
`;

export default Badge;
