import { PropsWithChildren } from 'react';

import { MutableSnapshot, RecoilRoot } from 'recoil';

import { CreatePostRequest } from '@/api/post/model';
import { postForm as initialPostForm } from '@/fixtures/post';
import postFormState from '@/recoil/post/create/atom';

interface Props {
  postForm?: CreatePostRequest;
}

function InjectTestingRecoil({ postForm = initialPostForm, children }: PropsWithChildren<Props>) {
  return (
    <RecoilRoot
      initializeState={({ set }: MutableSnapshot): void => {
        set(postFormState, postForm);
      }}
    >
      {children}
    </RecoilRoot>
  );
}

export default InjectTestingRecoil;
