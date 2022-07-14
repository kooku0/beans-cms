import React from 'react';

import { Table, User } from '@nextui-org/react';

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
        <User squared src={author.avatar} name={author.name} css={{ p: 0 }}>
          {author.email}
        </User>
      );
    }

    if (columnKey === 'position') {
      return <RoleCell position={author.position} team={author.team} />;
    }

    return <ActionsCell authorId={author.uid} />;
  };

  return (
    <Table
      aria-label="Authors table"
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
        {authors.map((author) => (
          <Table.Row key={author.uid}>
            {columns.map((column) => (
              <Table.Cell key={column.uid}>{renderCell(author, column.uid)}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export default AuthorsTable;
