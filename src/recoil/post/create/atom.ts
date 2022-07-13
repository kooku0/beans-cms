import { atom } from 'recoil';

import { CreatePostRequest } from '@/api/post/model';

const postFormState = atom<CreatePostRequest>({
  key: 'postFormState',
  default: {
    authorUid: '',
    status: 'draft',
    title: '',
    tags: [],
    html: '',
  },
});

export default postFormState;
