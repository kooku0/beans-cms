import { PostSchema } from '@/models/post';

const post: PostSchema = {
  uid: '1',
  authorUid: 'author-uid',
  status: 'draft',
  title: 'title',
  html: '<p>mock-html</p>',
  tags: ['mock-tag'],
};

export default post;
