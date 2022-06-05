import { render } from '@testing-library/react';

import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import OtpCertification from './otp-certification.page';

jest.mock('@/hooks/useFireGtmEvent');
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    push: jest.fn(),
    query: '',
  })),
}));

describe('OtpCertification', () => {
  const renderOtpCertification = () => render((
    <ReactQueryWrapper>
      <OtpCertification />
    </ReactQueryWrapper>
  ));

  it('인증 페이지에 대한 정보가 나타나야만 한다', () => {
    const { container } = renderOtpCertification();

    expect(container).toHaveTextContent('카카오톡 인증');
  });
});
