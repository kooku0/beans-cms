import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar, Button, Container, Input, Spacer,
} from '@nextui-org/react';
import * as yup from 'yup';

import { AuthorSchema } from '@/models/author';

interface Props {
  author: AuthorSchema;
}

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string(),
  position: yup.string(),
  team: yup.string(),
}).required();

function EditForm({ author }: Props) {
  const {
    register, handleSubmit, watch, formState: { errors },
  } = useForm({ resolver: yupResolver(schema), defaultValues: author });
  const onSubmit = (d: any) => console.log(d);

  const {
    avatar, name, email, position, team,
  } = author;

  return (
    <Container as="form" onSubmit={handleSubmit(onSubmit)} fluid gap={2} display="flex" direction="column" css={{ width: 360 }}>
      <Avatar squared src={avatar} size="xl" />
      <Spacer y={1} />
      <Input label="name" {...register('name')} />
      <Spacer y={0.2} />
      <Input label="email" {...register('email')} />
      <Spacer y={0.2} />
      <Input label="position" {...register('position')} />
      <Spacer y={0.2} />
      <Input label="team" {...register('position')} />
      <Spacer y={1} />
      <Button type="submit">저장하기</Button>
    </Container>
  );
}

export default EditForm;
