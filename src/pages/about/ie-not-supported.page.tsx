import React, { ReactElement } from 'react';

import Head from 'next/head';

import IENotSupported from '@/components/about/IENotSupported';

function IENotSupportedPage(): ReactElement {
  return (
    <>
      <Head>
        <title>처음 만나는 건물재테크, 카사</title>
      </Head>
      <IENotSupported />
    </>
  );
}

export default IENotSupportedPage;

IENotSupportedPage.displayName = 'DeviceNotSupported';
