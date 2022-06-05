import React, { ReactElement } from 'react';

import Head from 'next/head';

import MobileNotSupported from '@/components/about/MobileNotSupported';

function MobileNotSupportedPage(): ReactElement {
  return (
    <>
      <Head>
        <title>처음 만나는 건물재테크, 카사</title>
      </Head>
      <MobileNotSupported />
    </>
  );
}

export default MobileNotSupportedPage;

MobileNotSupportedPage.displayName = 'DeviceNotSupported';
