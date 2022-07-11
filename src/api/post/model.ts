import { PostSchema } from '@/models/post';

export type FetchPostsResponse = PostSchema[];
export type FetchPostResponse = PostSchema;

export type CreatePostRequest = Omit<PostSchema, 'uid'>;
export type CreatePostResponse = {
  uid: string;
};

export type PatchPostRequest = Partial<Omit<PostSchema, 'uid' | '_id'>>;
