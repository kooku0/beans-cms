import React, { ReactElement } from 'react';

import {
  css, Global, Theme, useTheme,
} from '@emotion/react';
import emotionNormalize from 'emotion-normalize';

import {
  h1Font, h2Font, h4Font, h5Font, h6Font,
} from './fontStyles';

const setGlobalStyles = (theme: Theme) => css`
  ${emotionNormalize}

  body {
    box-sizing: border-box;
    color: ${theme.primary400};
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    outline: none;
    cursor: pointer;
    border: unset;

    &:disabled {
      cursor: not-allowed;
    }
  }

  input {
    outline: none;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  h1 {
    ${h1Font}
    margin: 0;
  }

  h2 {
    ${h2Font}
  }

  h4 {
    ${h4Font}
    margin: 0;
  }

  h5 {
    ${h5Font}
    margin: 0;
  }

  h6 {
    ${h6Font}
  }
`;

function GlobalStyles(): ReactElement {
  const theme = useTheme();

  return (
    <Global styles={setGlobalStyles(theme)} />
  );
}

export default GlobalStyles;
