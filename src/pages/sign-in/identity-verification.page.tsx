import React, { ReactElement } from 'react';
import { useEffectOnce } from 'react-use';

import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import IdentityVerificationFormContainer from '@/containers/auth/IdentityVerificationFormContainer';
import useFireGtmEvent from '@/hooks/useFireGtmEvent';
import redirectToHomeIndividualMember from '@/services/serverSideProps/redirectToHomeIndividualMember';

export const getServerSideProps: GetServerSideProps = redirectToHomeIndividualMember;

function IdentityVerificationPage(): ReactElement {
  const fireGtmEvent = useFireGtmEvent();

  useEffectOnce(() => fireGtmEvent('verification_loaded', { method: 'phone' }));

  return (
    <>
      <NextSeo
        title="카사 - 휴대폰 본인 인증"
      />
      <IdentityVerificationFormContainer />
    </>
  );
}

export default IdentityVerificationPage;
