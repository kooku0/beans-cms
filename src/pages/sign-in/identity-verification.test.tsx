import { render } from '@testing-library/react';

import FIXTURE_IDENTITY_VERIFICATION from '@/fixtures/identityVerification';
import useCheckIdentityVerificationCode from '@/hooks/api/identityVerification/useCheckIdentityVerificationCode';
import useCreateIdentityVerificationToken from '@/hooks/api/identityVerification/useCreateIdentityVerificationToken';
import useFetchGeneralMemberTerms from '@/hooks/api/terms/useFetchGeneralMemberTerms';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import IdentityVerificationPage from './identity-verification.page';

jest.mock('@/hooks/api/identityVerification/useCheckIdentityVerificationCode');
jest.mock('@/hooks/api/identityVerification/useCreateIdentityVerificationToken');
jest.mock('@/hooks/api/terms/useFetchGeneralMemberTerms');
jest.mock('@/hooks/useFireGtmEvent');

describe('IdentityVerificationPage', () => {
  beforeEach(() => {
    (useCreateIdentityVerificationToken as jest.Mock).mockImplementation(() => ({
      isSuccess: false,
      mutate: jest.fn(),
      data: FIXTURE_IDENTITY_VERIFICATION,
    }));
    (useCheckIdentityVerificationCode as jest.Mock).mockImplementation(() => ({
      mutate: jest.fn(),
    }));
    (useFetchGeneralMemberTerms as jest.Mock).mockImplementation(() => ({
      data: [],
    }));
  });

  const renderIdentityVerificationPage = () => render((
    <ReactQueryWrapper>
      <IdentityVerificationPage />
    </ReactQueryWrapper>
  ));

  it('본인 인증 페이지에 대한 정보가 나타나야만 한다', () => {
    const { container } = renderIdentityVerificationPage();

    expect(container).toHaveTextContent('인증번호 요청');
  });
});
