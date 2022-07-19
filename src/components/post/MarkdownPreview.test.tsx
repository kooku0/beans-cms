import { render } from '@testing-library/react';

import { postForm as FIXTURE_POST_FORM } from '@/fixtures/post';
import InjectTestingRecoil from '@/test/InjectTestingRecoil';

import MarkdownPreview from './MarkdownPreview';

jest.mock('react-markdown');
jest.mock('remark-gfm', () => ({}));

describe('MarkdownPreview', () => {
  const renderMarkdownPreview = () => render((
    <InjectTestingRecoil postForm={FIXTURE_POST_FORM}>
      <MarkdownPreview />
    </InjectTestingRecoil>
  ));

  it('should render title', () => {
    const { container } = renderMarkdownPreview();

    expect(container).toHaveTextContent(FIXTURE_POST_FORM.title);
  });

  it('should render markdown', () => {
    const { container } = renderMarkdownPreview();

    expect(container).toHaveTextContent(FIXTURE_POST_FORM.markdown);
  });
});
