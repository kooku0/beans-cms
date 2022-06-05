import React, { ReactElement } from 'react';
import { useEffectOnce } from 'react-use';

import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import OtpCertificationContainer from '@/containers/auth/OtpCertificationContainer';
import useFireGtmEvent from '@/hooks/useFireGtmEvent';
import redirectToHomeIndividualMember from '@/services/serverSideProps/redirectToHomeIndividualMember';

export const getServerSideProps: GetServerSideProps = redirectToHomeIndividualMember;

function OtpCertificationPage(): ReactElement {
  const fireGtmEvent = useFireGtmEvent();

  useEffectOnce(() => fireGtmEvent('verification_loaded', { method: 'kakao' }));

  return (
    <>
      <NextSeo
        title="카사 - 카카오톡 인증"
      />
      <OtpCertificationContainer />
    </>
  );
}

export default OtpCertificationPage;
