import { css } from '@emotion/react';
import { Button, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';

import AuthorsTable from '@/components/author/table/AuthorsTable';
import useFetchAuthors from '@/hooks/query/author/useFetchAuthors';

function AuthorsPage() {
  const router = useRouter();
  const { data: authors } = useFetchAuthors();

  const handleCreate = () => router.push('/authors/create');

  if (!authors) {
    return <div>loading</div>;
  }

  return (
    <div css={css`width: 100%;`}>
      <Text h1>Authors Page</Text>
      <Button onPress={handleCreate}>Create</Button>
      <AuthorsTable authors={authors} />
    </div>
  );
}

export default AuthorsPage;
