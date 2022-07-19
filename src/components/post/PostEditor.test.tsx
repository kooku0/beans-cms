import { render } from '@testing-library/react';

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

  it('should render', () => {
    const { container } = renderPostEditor();

    expect(container).toBeInTheDocument();
  });
});
