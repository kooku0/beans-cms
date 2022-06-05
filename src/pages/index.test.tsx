import * as use from 'react-use';

import { render } from '@testing-library/react';

import { dabs as FIXTURE_DABS, dabsesItem as FIXTURE_DABSES_ITEM } from '@/fixtures/dabs';
import FIXTURE_INDIVIDUAL_MEMBER from '@/fixtures/individualMember';
import FIXTURE_MY_INVESTMENTS from '@/fixtures/myInvestments';
import { notices as FIXTURE_NOTICES } from '@/fixtures/notice';
import { press as FIXTURE_PRESS } from '@/fixtures/press';
import useFetchMyInvestments from '@/hooks/api/asset/useFetchMyInvestments';
import useFetchDabs from '@/hooks/api/dabs/useFetchDabs';
import useFetchDabses from '@/hooks/api/dabs/useFetchDabses';
import useFetchDabsLatestDividends from '@/hooks/api/dabs/useFetchDabsLatestDividends';
import useFetchDABSMarketState from '@/hooks/api/dabs/useFetchDABSMarketState';
import useFetchNotices from '@/hooks/api/notice/useFetchNotices';
import useInfiniteFetchPresses from '@/hooks/api/press/useInfiniteFetchPresses';
import useFetchLatestChart from '@/hooks/api/trading/useFetchLatestChart';
import useFetchTicker from '@/hooks/api/trading/useFetchTicker';
import useFetchIndividualMember from '@/hooks/api/user/useFetchIndividualMember';
import InjectTestingRecoil from '@/test/InjectTestingRecoil';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import HomePage from './index.page';

jest.mock('@/hooks/api/user/useFetchIndividualMember');
jest.mock('@/hooks/api/dabs/useInfiniteFetchDabsDividends');
jest.mock('@/hooks/api/asset/useFetchMyInvestments');
jest.mock('@/hooks/api/dabs/useFetchDabses');
jest.mock('@/hooks/api/dabs/useFetchDabs');
jest.mock('@/hooks/api/notice/useFetchNotices');
jest.mock('@/hooks/api/press/useInfiniteFetchPresses');
jest.mock('@/hooks/api/dabs/useFetchDABSMarketState');
jest.mock('@/hooks/api/dabs/useFetchDabsLatestDividends');
jest.mock('@/hooks/api/trading/useFetchTicker');
jest.mock('@/hooks/api/trading/useFetchLatestChart');
jest.mock('@/hooks/useFireGtmEvent');
jest.mock('react-chartjs-2', () => ({
  Line: () => null,
}));
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    query: {
      code: '1',
    },
  })),
}));

describe('HomePage', () => {
  const removeLoginSessionLifetime = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useFetchMyInvestments as jest.Mock).mockImplementation(() => ({
      data: FIXTURE_MY_INVESTMENTS,
    }));
    (useFetchIndividualMember as jest.Mock).mockImplementation(() => ({
      data: given.user,
    }));
    (useFetchDabs as jest.Mock).mockImplementation(() => ({
      data: FIXTURE_DABS,
    }));
    (useFetchDabses as jest.Mock).mockImplementation(() => ({
      data: [FIXTURE_DABSES_ITEM],
    }));
    (useFetchNotices as jest.Mock).mockImplementation(() => ({
      data: FIXTURE_NOTICES,
    }));
    (useInfiniteFetchPresses as jest.Mock).mockImplementation(() => ({
      data: {
        pages: [{
          items: [FIXTURE_PRESS],
        }],
      },
    }));

    (useFetchDABSMarketState as jest.Mock).mockImplementation(() => ({
      data: undefined,
    }));
    (useFetchDabsLatestDividends as jest.Mock).mockImplementation(() => ({
      data: undefined,
    }));
    (useFetchTicker as jest.Mock).mockImplementation(() => ({
      data: undefined,
      isLoading: false,
      isError: false,
    }));
    (useFetchLatestChart as jest.Mock).mockImplementation(() => ({
      data: undefined,
      isLoading: false,
      isError: false,
    }));

    jest.spyOn(use, 'useLocalStorage').mockImplementation(() => ([
      given.loginSessionLifetime, jest.fn(), removeLoginSessionLifetime,
    ]));
  });

  const renderHomePage = () => render((
    <ReactQueryWrapper>
      <InjectTestingRecoil>
        <HomePage />
      </InjectTestingRecoil>
    </ReactQueryWrapper>
  ));

  context('user가 존재하는 경우', () => {
    given('user', () => FIXTURE_INDIVIDUAL_MEMBER);

    it('투자회원의 투자 현환에 대한 내용이 보여져야만 한다', () => {
      const { container } = renderHomePage();

      expect(container).toHaveTextContent(`${FIXTURE_INDIVIDUAL_MEMBER.name}님의 투자`);
    });
  });

  context('user가 존재하지 않는 경우', () => {
    given('user', () => null);

    it('비로그인 홈페이지에 대한 내용이 보여져야만 한다', () => {
      const { container } = renderHomePage();

      expect(container).toHaveTextContent('투자 가능한 빌딩');
    });

    context('localStorage에 loginSessionLifetime이 존재한 경우', () => {
      given('loginSessionLifetime', () => 'short');

      it('removeLoginSessionLifetime가 호출되어야만 한다', () => {
        renderHomePage();

        expect(removeLoginSessionLifetime).toBeCalledTimes(1);
      });
    });

    context('localStorage에 loginSessionLifetime이 존재하지 않는 경우', () => {
      given('loginSessionLifetime', () => '');

      it('removeLoginSessionLifetime가 호출되지 않아야만 한다', () => {
        renderHomePage();

        expect(removeLoginSessionLifetime).not.toBeCalled();
      });
    });
  });
});
