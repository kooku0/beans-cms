import {
  Avatar, Button, Container, Input, Spacer, Text,
} from '@nextui-org/react';
import { useRouter } from 'next/router';

import useFetchAuthor from '@/hooks/query/author/useFetchAuthor';

function EditPage() {
  const router = useRouter();

  const { data } = useFetchAuthor(router.query.uid as string);

  const handleSubmit = () => console.log('submit');

  return (
    <div>
      <Text h1>Edit Page</Text>
      <Container as="form" onSubmit={handleSubmit} fluid gap={2} display="flex" direction="column" css={{ width: 360 }}>
        <Avatar squared src={data?.avatar} size="xl" />
        <Spacer y={2} />
        <Input labelPlaceholder="name" value={data?.name} />
        <Spacer y={2} />
        <Input labelPlaceholder="email" value={data?.email} />
        <Spacer y={2} />
        <Input labelPlaceholder="position" value={data?.position} />
        <Spacer y={2} />
        <Input labelPlaceholder="team" value={data?.team} />
        <Spacer y={1} />
        <Button type="submit">저장하기</Button>
      </Container>
    </div>
  );
}

export default EditPage;
