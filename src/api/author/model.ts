import { AuthorSchema } from '@/models/author';

export type FetchAuthorsResponse = AuthorSchema[];

export type PostAuthorRequest = Omit<AuthorSchema, '_id'>;
export type PostAuthorResponse = {
  _id: string;
};
