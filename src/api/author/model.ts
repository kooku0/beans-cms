import { AuthorSchema } from '@/models/author';

export type FetchAuthorsResponse = AuthorSchema[];

export type PostAuthorRequest = Omit<AuthorSchema, 'id'>;
export type PostAuthorResponse = never;
