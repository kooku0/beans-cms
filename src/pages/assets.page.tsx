import { ReactElement } from 'react';
import { QueryClient } from 'react-query';

import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import AssetsSection from '@/components/assets/AssetsSection';
import DepositAccountHistorySection from '@/components/assets/depositAccountHistory/DepositAccountHistorySection';
import BuildingListSection from '@/components/common/BuildingListSection';
import SubPageBanner from '@/components/common/SubPageBanner';
import prefetchIndividualMember from '@/services/serverSideProps/prefetchIndividualMember';
import redirectIfNotSupportedEnv from '@/services/serverSideProps/redirectIfNotSupportedEnv';

export const getServerSideProps: GetServerSideProps = redirectIfNotSupportedEnv(
  prefetchIndividualMember(new QueryClient()),
);

function AssetsPage(): ReactElement {
  return (
    <>
      <NextSeo
        title="카사 - 자산"
      />
      <AssetsSection />
      <BuildingListSection />
      <DepositAccountHistorySection />
      <SubPageBanner />
    </>
  );
}
export default AssetsPage;
