import React from 'react';
import { QueryClient } from 'react-query';

import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import SubPageBanner from '@/components/common/SubPageBanner';
import Notices from '@/components/customerSupport/Notices';
import prefetchIndividualMember from '@/services/serverSideProps/prefetchIndividualMember';
import redirectIfNotSupportedEnv from '@/services/serverSideProps/redirectIfNotSupportedEnv';
import Layout from '@/styles/Layout';

export const getServerSideProps: GetServerSideProps = redirectIfNotSupportedEnv(
  prefetchIndividualMember(new QueryClient()),
);

function NoticesPage() {
  return (
    <>
      <NextSeo
        title="카사 - 공지사항"
      />
      <NoticesLayout>
        <h1>공지사항</h1>
        <Notices />
      </NoticesLayout>
      <SubPageBanner />
    </>
  );
}

export default NoticesPage;

const NoticesLayout = styled(Layout)`
  margin-top: 65px;
  margin-bottom: 100px;
  min-height: calc(100vh - 687px);
`;
