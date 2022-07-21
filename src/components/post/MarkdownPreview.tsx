import ReactMarkdown from 'react-markdown';

import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import postFormState from '@/recoil/post/form/atom';

import 'github-markdown-css/github-markdown-light.css';

function MarkdownPreview() {
  const { markdown, title } = useRecoilValue(postFormState);

  return (
    <Wrapper>
      <Title>{title}</Title>
      <ReactMarkdown
        className="markdown-body"
        rehypePlugins={[
          rehypeRaw,
          rehypeHighlight]}
        remarkPlugins={[remarkGfm]}
      >
        {markdown}
      </ReactMarkdown>
    </Wrapper>
  );
}

export default MarkdownPreview;

const Wrapper = styled.div`
  padding: 1rem;
  padding-top: 0;
  height: 100vh;
  overflow: scroll;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 48px;
  position: sticky;
  top: 0;
  padding: 1rem 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
`;
