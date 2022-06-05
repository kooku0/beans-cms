import React, { ReactElement } from 'react';

import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import SignIn from '@/components/auth/SignIn';
import redirectToHomeIndividualMember from '@/services/serverSideProps/redirectToHomeIndividualMember';

export const getServerSideProps: GetServerSideProps = redirectToHomeIndividualMember;

function SignInPage(): ReactElement {
  return (
    <>
      <NextSeo
        title="카사 - 로그인"
      />
      <SignIn />
    </>
  );
}

export default SignInPage;
