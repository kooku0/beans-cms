import { render } from '@testing-library/react';

import { press as FIXTURE_PRESS } from '@/fixtures/press';
import useFetchPressCount from '@/hooks/api/press/useFetchPressCount';
import useInfiniteFetchPresses from '@/hooks/api/press/useInfiniteFetchPresses';

import PressesPage from './presses.page';

jest.mock('@/hooks/api/press/useFetchPressCount');
jest.mock('@/hooks/api/press/useInfiniteFetchPresses');

describe('PressesPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useFetchPressCount as jest.Mock).mockImplementation(() => ({
      data: 10,
    }));

    (useInfiniteFetchPresses as jest.Mock).mockImplementation(() => ({
      data: {
        pages: [{
          items: [FIXTURE_PRESS],
          lastPressUid: 'test',
        }],
      },
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      remove: jest.fn(),
    }));
  });

  const renderPressesPage = () => render((
    <PressesPage />
  ));

  it('"카사소식" 타이틀 문구가 나타나야만 한다', () => {
    const { container } = renderPressesPage();

    expect(container).toHaveTextContent('카사소식');
  });
});
