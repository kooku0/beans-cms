import React, { ReactElement } from 'react';
import { QueryClient } from 'react-query';

import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import SubPageBanner from '@/components/common/SubPageBanner';
import LoginHistories from '@/components/myPage/LoginHistories';
import prefetchIndividualMember from '@/services/serverSideProps/prefetchIndividualMember';
import redirectIfNotSupportedEnv from '@/services/serverSideProps/redirectIfNotSupportedEnv';
import { body2Font } from '@/styles/fontStyles';
import Layout from '@/styles/Layout';

export const getServerSideProps: GetServerSideProps = redirectIfNotSupportedEnv(
  prefetchIndividualMember(new QueryClient()),
);

function LoginManagementPage(): ReactElement {
  return (
    <>
      <NextSeo
        title="카사 - 로그인 관리"
      />
      <LoginManagementLayout>
        <LoginManagementHeader>
          <h1>로그인 관리</h1>
          <div>
            직접 로그인하지 않은 내역이 있다면, 모든 디바이스에서 로그아웃 해주세요.
          </div>
        </LoginManagementHeader>
        <LoginHistories />
      </LoginManagementLayout>
      <SubPageBanner />
    </>
  );
}

export default LoginManagementPage;

const LoginManagementLayout = styled(Layout)`
  min-height: calc(100vh - 687px);
  margin-top: 60px;
  margin-bottom: 100px;
`;

const LoginManagementHeader = styled.div`
  margin-bottom: 42px;

  & > div {
    ${body2Font}
    margin-top: 16px;
  }
`;
