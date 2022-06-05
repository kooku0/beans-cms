import { ParsedUrlQuery } from 'querystring';

import { createRef } from 'react';

import { render, screen } from '@testing-library/react';
import { GetServerSidePropsContext } from 'next';

import { fetchDabs, fetchDabses } from '@/api/dabs';
import { landPricesItem as FIXTURE_LAND_PRICE_ITEM } from '@/fixtures/building';
import FIXTURE_LATEST_CHART from '@/fixtures/chart';
import { dabs as FIXTURE_DABS } from '@/fixtures/dabs';
import FIXTURE_DABS_ACCOUNT from '@/fixtures/dabsAccount';
import FIXTURE_DABS_MARKET_STATE from '@/fixtures/dabsMarketState';
import FIXTURE_DAILY_CLOSING from '@/fixtures/dailyClosing';
import { depositAccount as FIXTURE_DEPOSIT_ACCOUNT } from '@/fixtures/depositAccount';
import { dabsDisclosures as FIXTURE_DABS_DISCLOSURES, disclosure as FIXTURE_DISCLOSURE } from '@/fixtures/disclosure';
import FIXTURE_DIVIDEND from '@/fixtures/dividend';
import FIXTURE_ORDER_BOOK from '@/fixtures/orderBook';
import FIXTURE_RECENT_MATCH from '@/fixtures/recentMatch';
import FIXTURE_TICKER from '@/fixtures/ticker';
import useFetchLandPrices from '@/hooks/api/building/useFetchLandPrices';
import useFetchDabs from '@/hooks/api/dabs/useFetchDabs';
import useFetchDabses from '@/hooks/api/dabs/useFetchDabses';
import useFetchDabsLatestDividends from '@/hooks/api/dabs/useFetchDabsLatestDividends';
import useFetchDABSMarketState from '@/hooks/api/dabs/useFetchDABSMarketState';
import useInfiniteFetchDabsDividends from '@/hooks/api/dabs/useInfiniteFetchDabsDividends';
import useFetchIndividualDabsAccount from '@/hooks/api/dabsAccount/useFetchIndividualDabsAccount';
import useFetchIndividualDepositAccount from '@/hooks/api/depositAccount/useFetchIndividualDepositAccount';
import useFetchDabsDisclosures from '@/hooks/api/disclosure/useFetchDabsDisclosures';
import useFetchDisclosure from '@/hooks/api/disclosure/useFetchDisclosure';
import useFetchLatestChart from '@/hooks/api/trading/useFetchLatestChart';
import useFetchOrderBook from '@/hooks/api/trading/useFetchOrderBook';
import useFetchTicker from '@/hooks/api/trading/useFetchTicker';
import useInfiniteFetchDailyClosings from '@/hooks/api/trading/useInfiniteFetchDailyClosings';
import useInfiniteFetchRecentMatches from '@/hooks/api/trading/useInfiniteFetchRecentMatches';
import useFetchIndividualMember from '@/hooks/api/user/useFetchIndividualMember';
import InjectTestingRecoil from '@/test/InjectTestingRecoil';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import ExchangePage, { getServerSideProps } from './exchange.page';

jest.mock('@/hooks/api/trading/useFetchOrderBook');
jest.mock('@/hooks/api/building/useFetchLandPrices');
jest.mock('@/hooks/api/trading/useFetchTicker');
jest.mock('@/hooks/api/dabs/useFetchDabses');
jest.mock('@/hooks/api/dabs/useFetchDabs');
jest.mock('@/hooks/api/trading/useInfiniteFetchRecentMatches');
jest.mock('@/hooks/api/trading/useInfiniteFetchDailyClosings');
jest.mock('@/hooks/api/disclosure/useFetchDabsDisclosures');
jest.mock('@/hooks/api/dabs/useInfiniteFetchDabsDividends');
jest.mock('@/hooks/api/disclosure/useFetchDisclosure');
jest.mock('@/hooks/api/trading/useFetchLatestChart');
jest.mock('@/hooks/api/dabs/useFetchDabsLatestDividends');
jest.mock('@/api/dabs');
jest.mock('@/hooks/useRouterQuery');
jest.mock('@/hooks/useMap');
jest.mock('@/hooks/api/user/useFetchIndividualMember');
jest.mock('@/hooks/api/depositAccount/useFetchIndividualDepositAccount');
jest.mock('@/hooks/api/dabsAccount/useFetchIndividualDabsAccount');
jest.mock('@/hooks/useFireGtmEvent');
jest.mock('@/hooks/api/dabs/useFetchDABSMarketState');
jest.mock('@/services/serverSideProps/prefetchIndividualMember', () => (
  jest.fn().mockImplementation(() => (
    jest.fn().mockImplementation(() => ({
      props: {},
    }))
  ))
));

jest.mock('next/router', () => ({
  useRouter() {
    return ({
      query: {
        code: '',
      },
    });
  },
}));
jest.mock('react-chartjs-2', () => ({
  Line: () => null,
}));

describe('ExchangePage', () => {
  const mockRef = createRef();

  beforeEach(() => {
    jest.clearAllMocks();

    (window.SVGElement.prototype as SVGGraphicsElement).getBBox = jest.fn()
      .mockReturnValue({
        x: 0,
        width: 0,
      });

    (useFetchOrderBook as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: FIXTURE_ORDER_BOOK,
    }));
    (useFetchLatestChart as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      isError: false,
      data: FIXTURE_LATEST_CHART,
    }));
    (useFetchDabses as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      isError: false,
      data: [FIXTURE_DABS],
    }));
    (useFetchTicker as jest.Mock).mockImplementation(() => ({
      isLoading: given.isLoading,
      data: FIXTURE_TICKER,
    }));
    (useFetchDabs as jest.Mock).mockImplementation(() => ({
      isLoading: given.isLoading,
      isError: false,
      data: FIXTURE_DABS,
    }));
    (useFetchLandPrices as jest.Mock).mockImplementation(() => ({
      isLoading: given.isLoading,
      isError: false,
      data: [FIXTURE_LAND_PRICE_ITEM],
    }));
    (useInfiniteFetchRecentMatches as jest.Mock).mockImplementation(() => ({
      responseRecentMatches: {
        status: 'success',
        data: {
          pages: [FIXTURE_RECENT_MATCH],
        },
      },
      recentMatchRefState: {
        lastItemRef: jest.fn(),
        wrapperRef: mockRef,
      },
    }));
    (useInfiniteFetchDailyClosings as jest.Mock).mockImplementation(() => ({
      responseDailyClosings: {
        status: 'success',
        data: {
          pages: [FIXTURE_DAILY_CLOSING],
        },
      },
      dailyClosingsRefState: {
        lastItemRef: jest.fn(),
        wrapperRef: mockRef,
      },
    }));
    (useInfiniteFetchDabsDividends as jest.Mock).mockImplementation(() => ({
      query: {
        data: {
          pages: [FIXTURE_DIVIDEND],
        },
      },
      refState: {
        lastItemRef: jest.fn(),
        wrapperRef: mockRef,
      },
    }));
    (useFetchDabsDisclosures as jest.Mock).mockImplementation(() => ({
      data: FIXTURE_DABS_DISCLOSURES,
    }));
    (useFetchDisclosure as jest.Mock).mockImplementation(() => ({
      data: FIXTURE_DISCLOSURE,
    }));
    (useFetchIndividualMember as jest.Mock).mockImplementation(() => ({
      data: given.user,
    }));
    (useFetchIndividualDepositAccount as jest.Mock).mockImplementation(() => ({
      data: FIXTURE_DEPOSIT_ACCOUNT,
    }));
    (useFetchIndividualDabsAccount as jest.Mock).mockImplementation(() => ({
      data: FIXTURE_DABS_ACCOUNT,
    }));
    (useFetchDABSMarketState as jest.Mock).mockImplementation(() => ({
      data: FIXTURE_DABS_MARKET_STATE,
    }));
    (useFetchDabsLatestDividends as jest.Mock).mockImplementation(() => ({
      data: undefined,
    }));
  });

  const renderExchangePage = () => render((
    <ReactQueryWrapper>
      <InjectTestingRecoil>
        <ExchangePage />
      </InjectTestingRecoil>
    </ReactQueryWrapper>
  ));

  it('차트 컴포넌트가 보여야 한다.', () => {
    renderExchangePage();

    expect(screen.getByTestId('trading-chart')).not.toBeNull();
  });
});

describe('getServerSideProps', () => {
  context('query에 code가 존재하는 경우', () => {
    beforeEach(() => {
      (fetchDabs as jest.Mock).mockImplementation(() => (FIXTURE_DABS));
    });

    const mockContext = {
      query: { code: FIXTURE_DABS.code } as ParsedUrlQuery,
      req: {
        headers: {
          'user-agent': 'Mozilla/5.0',
        },
      },
    };

    it('props에 dabs에 대한 hydratedStater가 존재해야만 한다', async () => {
      const response: any = await getServerSideProps(mockContext as GetServerSidePropsContext);

      expect(response.props.dehydratedState.queries[0].state.data).toEqual(FIXTURE_DABS);
    });
  });

  context('query에 code가 존재하지 않는 경우', () => {
    const mockContext = {
      query: { code: '' } as ParsedUrlQuery,
      req: {
        headers: {
          'user-agent': 'Mozilla/5.0',
        },
      },
    };

    beforeEach(() => {
      (fetchDabses as jest.Mock).mockReturnValueOnce([{
        ...FIXTURE_DABS,
        uiStatus: 'listed',
      }]);
    });

    it('redirect가 첫번째 dabs query로 반환되어야만 한다', async () => {
      const response: any = await getServerSideProps(mockContext as GetServerSidePropsContext);

      expect(response).toEqual({
        redirect: {
          destination: `/exchange?code=${FIXTURE_DABS.code}`,
          permanent: false,
        },
        props: {},
      });
    });
  });
});
