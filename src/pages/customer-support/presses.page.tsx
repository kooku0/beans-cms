import React from 'react';
import { QueryClient } from 'react-query';

import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import SubPageBanner from '@/components/common/SubPageBanner';
import Presses from '@/components/customerSupport/Presses';
import prefetchIndividualMember from '@/services/serverSideProps/prefetchIndividualMember';
import redirectIfNotSupportedEnv from '@/services/serverSideProps/redirectIfNotSupportedEnv';
import Layout from '@/styles/Layout';

export const getServerSideProps: GetServerSideProps = redirectIfNotSupportedEnv(
  prefetchIndividualMember(new QueryClient()),
);

function PressesPage() {
  return (
    <>
      <NextSeo
        title="카사 - 카사소식"
      />
      <PressesLayout>
        <h1>카사소식</h1>
        <Presses />
      </PressesLayout>
      <SubPageBanner />
    </>
  );
}

export default PressesPage;

const PressesLayout = styled(Layout)`
  margin-top: 65px;
  margin-bottom: 100px;
  min-height: calc(100vh - 687px);
`;
