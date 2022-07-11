import React from 'react';

import { User } from '@nextui-org/react';

import { AuthorSchema } from '@/models/author';
import { Column } from '@/models/table';

import ActionsCell from './ActionsCell';
import RoleCell from './PositionCell';

interface Props {
  authors: AuthorSchema[];
}

function AuthorsTable({ authors }: Props) {
  const columns: Column[] = [
    { name: 'NAME', uid: 'name' },
    { name: 'POSITION', uid: 'position' },
    { name: 'ACTIONS', uid: 'actions' },
  ];

  const renderCell = (author: AuthorSchema, columnKey: React.Key) => {
    if (columnKey === 'name') {
      return (
        <User squared src={author?.avatar} name={author.name} css={{ p: 0 }}>
          {author?.email}
        </User>
      );
    }

    if (columnKey === 'position') {
      return <RoleCell position={author?.position} team={author?.team} />;
    }

    return <ActionsCell authorId={author.uid} />;
  };

  return (
    <table
      aria-label="Authors table"
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
          authors?.map((author) => (
            <tr key={author.uid}>
              {
                columns.map((column) => (
                  <td key={column.uid}>{renderCell(author, column.uid)}</td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default AuthorsTable;
