import { render } from '@testing-library/react';
import { act } from '@testing-library/react-hooks';

import { dabsesItem as FIXTURE_DABSES_ITEM } from '@/fixtures/dabs';
import FIXTURE_INDIVIDUAL_MEMBER from '@/fixtures/individualMember';
import useFetchMyInvestments from '@/hooks/api/asset/useFetchMyInvestments';
import useFetchDabses from '@/hooks/api/dabs/useFetchDabses';
import useFetchDABSMarketState from '@/hooks/api/dabs/useFetchDABSMarketState';
import useFetchLatestChart from '@/hooks/api/trading/useFetchLatestChart';
import useFetchTicker from '@/hooks/api/trading/useFetchTicker';
import useFetchIndividualMember from '@/hooks/api/user/useFetchIndividualMember';
import InjectTestingRecoil from '@/test/InjectTestingRecoil';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import AssetsPage from './assets.page';

jest.mock('@/hooks/api/user/useFetchIndividualMember');
jest.mock('@/hooks/api/dabs/useFetchDabses');
jest.mock('@/hooks/api/dabs/useFetchDABSMarketState');
jest.mock('@/hooks/api/trading/useFetchLatestChart');
jest.mock('@/hooks/api/trading/useFetchTicker');
jest.mock('@/hooks/api/asset/useFetchMyInvestments');

describe('AssetsPage', () => {
  beforeEach(() => {
    (useFetchIndividualMember as jest.Mock).mockImplementation(() => ({
      data: FIXTURE_INDIVIDUAL_MEMBER,
    }));
    (useFetchDabses as jest.Mock).mockImplementation(() => ({
      data: [FIXTURE_DABSES_ITEM],
    }));
    (useFetchDABSMarketState as jest.Mock).mockImplementation(() => ({
      data: undefined,
    }));
    (useFetchLatestChart as jest.Mock).mockImplementation(() => ({
      data: undefined,
      isLoading: false,
      isError: false,
    }));
    (useFetchTicker as jest.Mock).mockImplementation(() => ({
      data: undefined,
      isLoading: false,
      isError: false,
    }));
    (useFetchMyInvestments as jest.Mock).mockImplementation(() => ({
      data: null,
    }));
  });

  const renderAssetsPage = () => render((
    <ReactQueryWrapper>
      <InjectTestingRecoil>
        <AssetsPage />
      </InjectTestingRecoil>
    </ReactQueryWrapper>
  ));

  it('자산 페이지에 대한 내용이 나타나야만 한다', async () => {
    const { container } = renderAssetsPage();

    await act(() => expect(container).toHaveTextContent('자산'));
  });
});
