export type PostSchema = {
  uid: string;
  authorUid: string;
  status: PostStatus;
  html: string;
  tags: string[];
}

export type PostStatus = 'draft' | 'published';
