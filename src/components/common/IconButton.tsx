import styled from '@emotion/styled';

const IconButton = styled('button')`
  display: flex;
  align-items: center;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  background-color: transparent;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`;

export default IconButton;
