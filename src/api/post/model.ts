import { PostSchema } from '@/models/post';

export type FetchPostsResponse = PostSchema[];
export type FetchPostResponse = PostSchema;

export type CreatePostRequest = Omit<PostSchema, 'uid' | 'createdAt' | 'updatedAt'>;
export type CreatePostResponse = {
  uid: string;
};

export type UpdatePostRequest = Partial<Omit<PostSchema, 'uid' | 'createdAt' | 'updatedAt'>>;
