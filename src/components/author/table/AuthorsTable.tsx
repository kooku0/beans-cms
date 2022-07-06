import { memo } from 'react';

import styled from '@emotion/styled';
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
        <User squared src={author?.avatar} name={author.name} css={{ p: 0 }}>
          {author?.email}
        </User>
      );
    }

    if (columnKey === 'position') {
      return <RoleCell position={author?.position} team={author?.team} />;
    }

    if (columnKey === 'actions') {
      return <ActionsCell />;
    }

    return null;
  };

  return (
    <TableWrapper>
      <Table
        aria-label="Example table with custom cells"
        css={{
          height: 'auto',
          minWidth: '100%',
        }}
        shadow={false}
        selectionMode="none"
      >
        <Table.Header columns={columns}>
          {(column: Column) => (
            <Table.Column
              key={column.uid}
              hideHeader={column.uid === 'actions'}
              align={column.uid === 'actions' ? 'center' : 'start'}
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={authors} loadingState="loading">
          {(item: AuthorSchema) => (
            <Table.Row key={item.uid}>
              {(columnKey: string) => (
                <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
        <Table.Pagination
          noMargin
          align="center"
          rowsPerPage={3}
          onPageChange={(page) => console.log({ page })}
        />
      </Table>
    </TableWrapper>
  );
}

export default memo(AuthorsTable);

const TableWrapper = styled.div`
  max-width: 920px;
  width: 100%;
  margin: auto;
`;
