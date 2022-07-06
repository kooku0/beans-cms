import { AuthorSchema } from '@/models/author';

export type FetchAuthorsResponse = AuthorSchema[];
export type FetchAuthorResponse = AuthorSchema;

export type PostAuthorRequest = Omit<AuthorSchema, 'uid'>;
export type PostAuthorResponse = {
  uid: string;
};
