import React, { ReactElement } from 'react';

import Head from 'next/head';

import SignInErrorNone from '@/components/auth/SignInErrorNone';

function SignInErrorNonePage(): ReactElement {
  return (
    <>
      <Head>
        <title>처음 만나는 건물재테크, 카사</title>
      </Head>
      <SignInErrorNone />
    </>
  );
}

export default SignInErrorNonePage;
