import { ReactElement } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { Element } from 'react-scroll';

import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import useResizeObserver from 'use-resize-observer/polyfilled';

import { fetchDabs, fetchDabses } from '@/api/dabs';
import SubPageBanner from '@/components/common/SubPageBanner';
import BuildingSection from '@/components/exchange/building/BuildingSection';
import ClearingTradeWarningPopup from '@/components/exchange/ClearingTradeWarningPopup';
import DisclosureSection from '@/components/exchange/disclosure/DisclosureSection';
import DividendSection from '@/components/exchange/dividend/DividendSection';
import InvestmentDocumentSection from '@/components/exchange/InvestmentDocumentSection';
import InvestmentPointSection from '@/components/exchange/investmentPoint/InvestmentPointSection';
import LandSection from '@/components/exchange/land/LandSection';
import SurroundingDevelopmentPlanSection from '@/components/exchange/surroundingDevelopmentPlan/SurroundingDevelopmentPlanSection';
import TapMenu from '@/components/exchange/TapMenu';
import TenantSection from '@/components/exchange/TenantSection';
import BuildingListContainer from '@/containers/exchange/BuildingListContainer';
import ChartContainer from '@/containers/exchange/ChartContainer';
import ConclusionContainer from '@/containers/exchange/ConclusionContainer';
import MainContentsHeaderContainer from '@/containers/exchange/MainContentsHeaderContainer';
import OrderContainer from '@/containers/exchange/OrderContainer';
import { Dabs } from '@/models/dabs';
import prefetchIndividualMember from '@/services/serverSideProps/prefetchIndividualMember';
import redirectIfNotSupportedEnv from '@/services/serverSideProps/redirectIfNotSupportedEnv';
import Layout from '@/styles/Layout';
import { filteredDabses, orderByListedDabses } from '@/utils/filter';

export const getServerSideProps: GetServerSideProps = redirectIfNotSupportedEnv(async (context) => {
  const { code } = context.query;
  const queryClient = new QueryClient();

  const propsWithIndividualMember = await prefetchIndividualMember(queryClient)(context);

  if (code) {
    await queryClient.prefetchQuery<Dabs>(['dabs', code], () => fetchDabs(code as string));

    return {
      ...propsWithIndividualMember,
      props: {
        ...propsWithIndividualMember.props,
        dehydratedState: dehydrate(queryClient),
      },
    };
  }

  const dabses = await fetchDabses();
  const sortedFilteredDabses = orderByListedDabses(filteredDabses(dabses));

  return {
    redirect: {
      destination: `/exchange?code=${sortedFilteredDabses?.[0].code}`,
      permanent: false,
    },
    ...propsWithIndividualMember,
  };
});

function ExchangePage(): ReactElement {
  const { ref, height = 1 } = useResizeObserver<HTMLDivElement>();

  return (
    <>
      <NextSeo
        title="카사 - 투자"
      />
      <ExchangeLayout>
        <SubContents style={{
          height: height - 190,
        }}
        >
          <SubTab>
            <BuildingListContainer />
          </SubTab>
        </SubContents>
        <MainContentsHeaderContainer ref={ref}>
          <>
            <TapMenu />
            <Element name="chartTap">
              <ChartContainer />
            </Element>
            <Element name="orderTap">
              <OrderWrapper>
                <ConclusionContainer />
                <OrderContainer />
              </OrderWrapper>
            </Element>
            <Element name="investmentPointTap">
              <InvestmentPointSection />
            </Element>
            <Element name="dividendTap">
              <DividendSection />
            </Element>
            <Element name="buildingSectionTap">
              <BuildingSection />
            </Element>
            <Element name="landSectionTap">
              <LandSection />
            </Element>
            <SurroundingDevelopmentPlanSection />
            <Element name="tenantSectionTap">
              <TenantSection />
            </Element>
            <InvestmentDocumentSection />
            <DisclosureSection />
          </>
        </MainContentsHeaderContainer>
      </ExchangeLayout>
      <SubPageBanner />
      <ClearingTradeWarningPopup />
    </>
  );
}

export default ExchangePage;

const OrderWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 30px;
  margin-bottom: 40px;
`;

const SubContents = styled.aside`
  float: right;
  width: 32%;
  margin-top: 60px;
  position: relative;
  height: 3000px;
`;

const SubTab = styled.div`
  position: sticky;
  top: 80px;
`;

const ExchangeLayout = styled(Layout)`
  display: flow-root;

  &::after {
    content: "";
    display: block;
    clear: both;
  }
`;
