import { render } from '@testing-library/react';

import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import LoginManagementPage from './login-management.page';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    replace: jest.fn(),
  })),
}));

describe('LoginManagementPage', () => {
  const renderLoginManagementPage = () => render((
    <ReactQueryWrapper>
      <LoginManagementPage />
    </ReactQueryWrapper>
  ));

  it('로그인 관리 페이지에 대한 정본가 나타나야만 한다', () => {
    const { container } = renderLoginManagementPage();

    expect(container).toHaveTextContent('로그인 관리');
  });
});
