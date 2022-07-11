import React from 'react';

import { PostSchema } from '@/models/post';
import { Column } from '@/models/table';

import ActionsCell from './ActionsCell';

interface Props {
  posts: PostSchema[];
}

function PostsTable({ posts }: Props) {
  const columns: Column[] = [
    { name: 'STATUS', uid: 'status' },
    { name: 'CREATED AT', uid: 'createdAt' },
    { name: 'TITLE', uid: 'title' },
    { name: 'AUTHOR', uid: 'post' },
    { name: 'ACTIONS', uid: 'actions' },
  ];

  const renderCell = (post: PostSchema, columnKey: React.Key) => {
    if (columnKey === 'actions') {
      return <ActionsCell postId={post.uid} />;
    }

    return <div>{post[columnKey]}</div>;
  };

  return (
    <table
      aria-label="Posts table"
      css={{
        height: 'auto',
        minWidth: '100%',
      }}
    >
      <thead>
        <tr>
          {columns.map((column: Column) => (
            <th key={column.uid} align={column.uid === 'actions' ? 'center' : 'left'}>
              {column.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {
          posts?.map((post) => (
            <tr key={post.uid}>
              {
                columns.map((column) => (
                  <td key={column.uid}>{renderCell(post, column.uid)}</td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default PostsTable;
