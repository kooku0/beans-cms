import React from 'react';

import styled from '@emotion/styled';
import { NextSeo } from 'next-seo';

import SubPageBanner from '@/components/common/SubPageBanner';
import FAQHeader from '@/components/customerSupport/FAQHeader';
import FAQList from '@/components/customerSupport/FAQList';

function FAQPage() {
  return (
    <>
      <NextSeo
        title="카사 - 자주 묻는 질문"
      />
      <FAQWrapper>
        <FAQHeader />
        <FAQList />
      </FAQWrapper>
      <SubPageBanner />
    </>
  );
}

export default FAQPage;

const FAQWrapper = styled.div`
  min-height: calc(100vh - 500px);
`;
