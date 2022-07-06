/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { css, ThemeProvider } from '@emotion/react';
import { NextUIProvider } from '@nextui-org/react';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { RecoilRoot } from 'recoil';

import Sidebar from '@/components/common/sidebar/Sidebar';
import GlobalStyles from '@/styles/GlobalStyles';
import lightTheme from '@/styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  }));

  const sidebarConfig = [
    {
      text: 'Contents',
      link: '/contents',
    },
    {
      text: 'Meta',
      items: [
        {
          text: 'Authors',
          link: '/authors',
        },
      ],
    },
    {
      text: 'Images',
      link: '/images',
    },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>
          <ThemeProvider theme={lightTheme}>
            <NextNProgress
              color={lightTheme.success300}
              options={{
                showSpinner: false,
                easing: 'ease',
                speed: 300,
                trickle: false,
              }}
            />
            <GlobalStyles />
            <NextUIProvider>
              <main css={css({ display: 'flex' })}>
                <Sidebar
                  config={sidebarConfig}
                  header={<img src="/logo.png" alt="logo" />}
                />
                <Component {...pageProps} />
              </main>
            </NextUIProvider>
          </ThemeProvider>
        </RecoilRoot>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;

dayjs.extend(utc);
dayjs.extend(timezone);
