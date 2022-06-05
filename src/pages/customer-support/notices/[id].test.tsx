import { render } from '@testing-library/react';

import { notice as FIXTURE_NOTICE } from '@/fixtures/notice';
import useFetchNotice from '@/hooks/api/notice/useFetchNotice';
import useRouterQuery from '@/hooks/useRouterQuery';

import NoticeDetailPage from './[id].page';

jest.mock('@/hooks/useRouterQuery');
jest.mock('@/hooks/api/notice/useFetchNotice');

describe('NoticeDetailPage', () => {
  beforeEach(() => {
    (useRouterQuery as jest.Mock).mockImplementation(() => 'noticeId');
    (useFetchNotice as jest.Mock).mockImplementation(() => ({
      data: FIXTURE_NOTICE,
    }));
  });

  const renderNoticeDetailPage = () => render((
    <NoticeDetailPage />
  ));

  it('"공지사항" 타이틀 문구가 나타나야만 한다', () => {
    const { container } = renderNoticeDetailPage();

    expect(container).toHaveTextContent('공지사항');
  });
});
