/* eslint-disable react/jsx-props-no-spreading */
import { ReactElement, useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { ThemeProvider } from '@emotion/react';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { RecoilRoot } from 'recoil';

import GlobalStyles from '@/styles/GlobalStyles';
import lightTheme from '@/styles/theme';

import '../assets/css/faq-body-style.css';

axiosInterceptors();

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  }));

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
            <Component {...pageProps} />
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
