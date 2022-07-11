import { PostSchema } from '@/models/post';

const post: PostSchema = {
  uid: '1',
  authorUid: 'author-uid',
  status: 'draft',
  title: 'title',
  html: '<p>mock-html</p>',
  tags: ['mock-tag'],
  createdAt: '2020-01-01T00:00:00.000Z',
  updatedAt: '2020-01-01T00:00:00.000Z',
};

export default post;
