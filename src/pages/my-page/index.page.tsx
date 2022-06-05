import { ReactElement } from 'react';
import { QueryClient } from 'react-query';
import { useEffectOnce } from 'react-use';

import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import Button from '@/components/common/Button';
import SubPageBanner from '@/components/common/SubPageBanner';
import CustomerSupport from '@/components/myPage/CustomerSupport';
import MyInfoSection from '@/components/myPage/MyInfoSection';
import useFireGtmEvent from '@/hooks/useFireGtmEvent';
import prefetchIndividualMember from '@/services/serverSideProps/prefetchIndividualMember';
import redirectIfNotSupportedEnv from '@/services/serverSideProps/redirectIfNotSupportedEnv';
import Layout from '@/styles/Layout';

export const getServerSideProps: GetServerSideProps = redirectIfNotSupportedEnv(
  prefetchIndividualMember(new QueryClient()),
);

function MyPage(): ReactElement {
  const fireGtmEvent = useFireGtmEvent();

  useEffectOnce(() => fireGtmEvent('mypage_loaded'));

  const handleClickLoginManagement = () => fireGtmEvent('login_management_clicked');

  return (
    <>
      <NextSeo
        title="카사 - 마이페이지"
      />
      <MyPageLayout>
        <MyPageHeader>
          <h1>마이페이지</h1>
          <Button href="/my-page/login-management" size="medium" onClick={handleClickLoginManagement}>
            로그인 관리
          </Button>
        </MyPageHeader>
        <MyInfoSection />
        <CustomerSupport />
      </MyPageLayout>
      <SubPageBanner />
    </>
  );
}

export default MyPage;

const MyPageHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 60px 0;
`;

const MyPageLayout = styled(Layout)`
  min-height: calc(100vh - 687px);
`;
