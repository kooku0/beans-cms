import React from 'react';
import { QueryClient } from 'react-query';

import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import SubPageBanner from '@/components/common/SubPageBanner';
import NoticeDetail from '@/components/customerSupport/NoticeDetail';
import useFetchNotice from '@/hooks/api/notice/useFetchNotice';
import useRouterQuery from '@/hooks/useRouterQuery';
import prefetchIndividualMember from '@/services/serverSideProps/prefetchIndividualMember';
import redirectIfNotSupportedEnv from '@/services/serverSideProps/redirectIfNotSupportedEnv';
import Layout from '@/styles/Layout';

export const getServerSideProps: GetServerSideProps = redirectIfNotSupportedEnv(
  prefetchIndividualMember(new QueryClient()),
);

function NoticeDetailPage() {
  const noticeId = useRouterQuery('id');

  const { data: notice } = useFetchNotice({ noticeId });

  return (
    <>
      <NextSeo
        title="카사 - 공지사항"
        description={notice?.title}
      />
      <NoticeDetailLayout>
        <h1>공지사항</h1>
        <NoticeDetail notice={notice} />
      </NoticeDetailLayout>
      <SubPageBanner />
    </>
  );
}

export default NoticeDetailPage;

const NoticeDetailLayout = styled(Layout)`
  margin-top: 65px;
  margin-bottom: 100px;
  min-height: calc(100vh - 687px);
`;
