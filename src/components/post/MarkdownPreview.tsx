import ReactMarkdown from 'react-markdown';

import { useRecoilValue } from 'recoil';
import remarkGfm from 'remark-gfm';

import postFormState from '@/recoil/post/form/atom';

function MarkdownPreview() {
  const { markdown } = useRecoilValue(postFormState);

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {markdown}
    </ReactMarkdown>
  );
}

export default MarkdownPreview;
