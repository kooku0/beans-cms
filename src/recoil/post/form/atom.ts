import { atom } from 'recoil';

import { CreatePostForm, PostSchema } from '@/models/post';

const postFormState = atom<CreatePostForm | PostSchema>({
  key: 'postFormState',
  default: {
    authorUid: '',
    status: 'create',
    title: '',
    tags: [],
    markdown: '',
  },
});

export default postFormState;
