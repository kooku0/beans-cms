import theme from '@/styles/theme';

import '@emotion/react';

declare module '@emotion/react' {
  type CustomTheme = typeof theme;

  export interface Theme extends CustomTheme {}
}
