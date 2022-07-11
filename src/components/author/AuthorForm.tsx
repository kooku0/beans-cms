import { Fragment } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar, Button, Container, Input, Spacer,
} from '@nextui-org/react';
import * as yup from 'yup';

import { PatchAuthorRequest, CreateAuthorRequest } from '@/api/author/model';
import { AuthorSchema } from '@/models/author';

interface Props {
  author?: AuthorSchema;
  onSubmit: ((formData: PatchAuthorRequest) => void) | ((formData: CreateAuthorRequest) => void);
}

function AuthorForm({ author, onSubmit }: Props) {
  const {
    avatar, name, email, position, team,
  } = author ?? {
    avatar: '',
    name: '',
    email: '',
    position: '',
    team: '',
  };

  const {
    register, handleSubmit, reset, formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name, email, position, team,
    },
  });

  const fields = (Object.keys(schema.fields) as Array<keyof Schema>);
  const submitText = author ? 'Update' : 'Create';

  const onSubmitHandler = (formData: Schema) => {
    onSubmit(formData);
    reset();
  };

  return (
    <Container as="form" role="form" onSubmit={handleSubmit(onSubmitHandler)} fluid gap={2} display="flex" direction="column" css={{ width: 360 }}>
      <Avatar squared src={avatar} size="xl" />
      <Spacer y={1} />
      {fields.map((label) => (
        <Fragment key={label}>
          <Input label={label} {...register(label)} helperText={errors[label]?.message} helperColor="error" />
          <Spacer y={1} />
        </Fragment>
      ))}
      <Button type="submit" role="button" disabled={!isValid}>{submitText}</Button>
    </Container>
  );
}

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string(),
  position: yup.string(),
  team: yup.string(),
}).required();

type Schema = yup.InferType<typeof schema>;

export default AuthorForm;
