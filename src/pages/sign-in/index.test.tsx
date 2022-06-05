import { render } from '@testing-library/react';

import SignInPage from './index.page';

jest.mock('@/hooks/useFireGtmEvent');
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    query: '',
  })),
}));

describe('SignInPage', () => {
  const renderSignInPage = () => render((
    <SignInPage />
  ));

  it('로그인 페이지에 대한 제목이 보여진다', () => {
    const { container } = renderSignInPage();

    expect(container).toHaveTextContent('로그인');
  });
});
