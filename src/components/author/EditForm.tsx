import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar, Button, Container, Input, Spacer,
} from '@nextui-org/react';
import * as yup from 'yup';

import { patchAuthor } from '@/api/author';
import { PatchAuthorRequest } from '@/api/author/model';
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

type Schema = yup.InferType<typeof schema>;

function EditForm({ author }: Props) {
  const {
    avatar, name, email, position, team,
  } = author;

  const {
    register, handleSubmit, formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      avatar, name, email, position, team,
    },
  });
  const onSubmit = (formData: PatchAuthorRequest) => patchAuthor(author.uid, formData);

  const fields = useMemo(() => (Object.keys(schema.fields) as Array<keyof Schema>).map((label) => (
    <div key={label}>
      <Input label={label} {...register(label)} helperText={errors[label]?.message} helperColor="error" />
      <Spacer y={1} />
    </div>
  )), [schema, register, errors]);

  return (
    <Container as="form" onSubmit={handleSubmit(onSubmit)} fluid gap={2} display="flex" direction="column" css={{ width: 360 }}>
      <Avatar squared src={avatar} size="xl" />
      <Spacer y={1} />
      {fields}
      <Button type="submit">저장하기</Button>
    </Container>
  );
}

export default EditForm;
