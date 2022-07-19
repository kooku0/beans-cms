import { act, render } from '@testing-library/react';

import InjectTestingRecoil from '@/test/InjectTestingRecoil';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import PostEditor from './PostEditor';

jest.mock('@/components/post/MarkdownPreview');

describe('PostEditor', () => {
  const renderPostEditor = () => render((
    <ReactQueryWrapper>
      <InjectTestingRecoil>
        <PostEditor />
      </InjectTestingRecoil>
    </ReactQueryWrapper>
  ));

  it('should be render', async () => {
    const { container } = renderPostEditor();

    await act(async () => {
      await expect(container).toBeInTheDocument();
    });
  });
});
