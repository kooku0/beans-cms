import React from 'react';

import { Table } from '@nextui-org/react';
import dayjs from 'dayjs';

import Badge from '@/components/common/Badge';
import { PostSchema, PostStatus } from '@/models/post';
import { Column } from '@/models/table';

import ActionsCell from './ActionsCell';
import AuthorCell from './AuthorCell';

interface Props {
  posts: PostSchema[];
}

function PostsTable({ posts }: Props) {
  const columns: Column[] = [
    { name: 'STATUS', uid: 'status' },
    { name: 'CREATED AT', uid: 'createdAt' },
    { name: 'TITLE', uid: 'title' },
    { name: 'AUTHOR', uid: 'author' },
    { name: 'ACTIONS', uid: 'actions' },
  ];

  const statusBadgeColor: { [key in PostStatus]: any } = {
    draft: {
      color: '#F6AD37',
    },
    published: {
      color: '#41EC8B',
    },
  };

  const renderCell = (post: PostSchema, columnKey: React.Key) => {
    if (columnKey === 'status') {
      return <Badge bordered color={statusBadgeColor[post.status].color}>{post.status}</Badge>;
    }

    if (columnKey === 'createdAt') {
      return <div>{dayjs(post.createdAt).format('YYYY/MM/DD HH:mm:ss')}</div>;
    }

    if (columnKey === 'title') {
      return <div>{post.title}</div>;
    }

    if (columnKey === 'author') {
      return <AuthorCell authorUid={post.authorUid} />;
    }

    return <ActionsCell postId={post.uid} />;
  };

  return (
    <Table
      aria-label="Posts table"
      lined
      css={{
        height: 'auto',
        minWidth: '100%',
      }}
    >
      <Table.Header>
        {columns.map((column: Column) => (
          <Table.Column key={column.uid} hideHeader={column.uid === 'actions'} align={column.uid === 'actions' ? 'center' : 'start'}>
            {column.name}
          </Table.Column>
        ))}
      </Table.Header>
      <Table.Body>
        {posts.map((post) => (
          <Table.Row key={post.uid}>
            {columns.map((column) => (
              <Table.Cell key={column.uid}>{renderCell(post, column.uid)}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export default PostsTable;
