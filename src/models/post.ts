export type PostSchema = {
  uid: string;
  authorUid: string;
  status: PostStatus;
  title: string;
  html: string;
  tags: string[];
}

export type PostStatus = 'draft' | 'published';
