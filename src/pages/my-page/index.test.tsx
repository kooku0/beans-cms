import { fireEvent, render, screen } from '@testing-library/react';

import useFireGtmEvent from '@/hooks/useFireGtmEvent';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import MyPage from './index.page';

jest.mock('@/hooks/useFireGtmEvent');
jest.mock('next/link', () => ({ children }: any) => children);

describe('MyPage', () => {
  const fireGtmEvent = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useFireGtmEvent as jest.Mock).mockReturnValue(fireGtmEvent);
  });

  const renderMyPage = () => render((
    <ReactQueryWrapper>
      <MyPage />
    </ReactQueryWrapper>
  ));

  it('마이페이지에 대한 내용이 나타나야만 한다', () => {
    const { container } = renderMyPage();

    expect(container).toHaveTextContent('마이페이지');
  });

  context('"로그인 관리"를 클릭하면', () => {
    it('gtm event가 호출되어야 한다.', () => {
      renderMyPage();

      fireEvent.click(screen.getByText('로그인 관리'));

      expect(fireGtmEvent).toBeCalled();
    });
  });
});
