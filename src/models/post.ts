export type PostSchema = {
  uid: string;
  authorUid: string;
  status: PostStatus;
  title: string;
  html: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export type PostStatus = 'draft' | 'published';

export type CreatePostStatus = PostStatus | 'create';

export type CreatePostForm = {
  authorUid: string;
  status: CreatePostStatus;
  title: string;
  html: string;
  tags: string[];
}
