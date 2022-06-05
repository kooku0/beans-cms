/* eslint-disable react/jsx-props-no-spreading */
import { ReactElement, useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useEffectOnce } from 'react-use';

import { ThemeProvider } from '@emotion/react';
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import NextNProgress from 'nextjs-progressbar';
import { RecoilRoot } from 'recoil';

import axiosInterceptors from '@/api/interceptors';
import DeviceDetectWarningPopup from '@/components/common/DeviceDetectWarningPopup';
import Footer from '@/components/common/Footer';
import MobileAppDownloadPopup from '@/components/common/MobileAppDownloadPopup';
import TokenVerify from '@/components/common/TokenVerify';
import HeaderContainer from '@/containers/common/HeaderContainer';
import useTagManager from '@/hooks/useTagManager';
import GlobalStyles from '@/styles/GlobalStyles';
import lightTheme from '@/styles/theme';

import defaultNextSeoConfig from '../../next-seo.config';

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

  useTagManager();

  useEffectOnce(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);
    }
  });

  if (Component.displayName === 'DeviceNotSupported') {
    return (
      <>
        <DefaultSeo {...defaultNextSeoConfig} />
        <ThemeProvider theme={lightTheme}>
          <GlobalStyles />
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }

  return (
    <>
      <DefaultSeo {...defaultNextSeoConfig} />
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
              <TokenVerify />
              <MobileAppDownloadPopup />
              <DeviceDetectWarningPopup />
              <HeaderContainer />
              <Component {...pageProps} />
              <Footer />
            </ThemeProvider>
          </RecoilRoot>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;

dayjs.extend(utc);
dayjs.extend(timezone);

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);
