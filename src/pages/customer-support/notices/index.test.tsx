import { render } from '@testing-library/react';

import useFetchNotices from '@/hooks/api/notice/useFetchNotices';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import NoticesPage from './index.page';

jest.mock('@/hooks/api/notice/useFetchNotices');

describe('NoticesPage', () => {
  beforeEach(() => {
    (useFetchNotices as jest.Mock).mockImplementation(() => ({
      data: undefined,
      isLoading: false,
    }));
  });

  const renderNoticesPage = () => render((
    <ReactQueryWrapper>
      <NoticesPage />
    </ReactQueryWrapper>
  ));

  it('"공지사항" 타이틀 문구가 나타나야만 한다', () => {
    const { container } = renderNoticesPage();

    expect(container).toHaveTextContent('공지사항');
  });
});
