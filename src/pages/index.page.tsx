import React, { ReactElement } from 'react';
import { QueryClient } from 'react-query';
import { useEffectOnce, useLocalStorage } from 'react-use';

import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import InvestableBuildings from '@/components/common/InvestableBuildings';
import BuildingPriceSection from '@/components/home/buildingsPrice/BuildingsPriceSection';
import CorporateMemberRegister from '@/components/home/CorporateMemberRegister';
import LoggedInHomeContainer from '@/components/home/LoggedInHomeContainer';
import NewsSection from '@/components/home/news/NewsSection';
import PlatformPromotion from '@/components/home/PlatformPromotion';
import useFetchIndividualMember from '@/hooks/api/user/useFetchIndividualMember';
import useFireGtmEvent from '@/hooks/useFireGtmEvent';
import { Lifetime } from '@/models/auth';
import prefetchIndividualMember from '@/services/serverSideProps/prefetchIndividualMember';
import redirectIfNotSupportedEnv from '@/services/serverSideProps/redirectIfNotSupportedEnv';

export const getServerSideProps: GetServerSideProps = redirectIfNotSupportedEnv(
  prefetchIndividualMember(new QueryClient()),
);

function HomePage(): ReactElement {
  const fireGtmEvent = useFireGtmEvent();
  const [loginSessionLifetime, , removeLoginSessionLifetime] = useLocalStorage<Lifetime>('loginSessionLifetime', 'short');

  const { data: user } = useFetchIndividualMember();

  useEffectOnce(() => fireGtmEvent('home_loaded'));

  useEffectOnce(() => {
    if (!user && loginSessionLifetime) {
      removeLoginSessionLifetime();
    }
  });

  if (!user) {
    return (
      <>
        <Head>
          <title>처음 만나는 건물재테크, 카사 - Kasa</title>
        </Head>
        <Main>
          <BuildingPriceSection />
          <InvestableBuildings />
          <PlatformPromotion />
          <NewsSection />
          <CorporateMemberRegister />
        </Main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>처음 만나는 건물재테크, 카사 - Kasa</title>
      </Head>
      <Main>
        <LoggedInHomeContainer />
      </Main>
    </>
  );
}

export default HomePage;

const Main = styled.main`
  min-height: calc(100vh - 367px);
`;
