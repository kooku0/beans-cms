import { AuthorSchema } from '@/models/author';

export type FetchAuthorsResponse = AuthorSchema[];
export type FetchAuthorResponse = AuthorSchema;

export type CreateAuthorRequest = Omit<AuthorSchema, 'uid'>;
export type CreateAuthorResponse = {
  uid: string;
};

export type UpdateAuthorRequest = Partial<Omit<AuthorSchema, 'uid' | '_id'>>;
