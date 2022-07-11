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
